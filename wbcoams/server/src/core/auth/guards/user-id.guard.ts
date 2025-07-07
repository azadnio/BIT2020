import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ExtendedRequest } from 'src/common/types/extended-request.type';
import { MATCH_ID_USER_KEY } from '../decorators/match-id-user.decorators';
import { UserRole } from '@SharedRepo/enums/user-roles.enum';

@Injectable()
export class MatchUserIdGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean { 
    console.log('MatchUserIdGuard: Checking user ID match');
    // Get the current HTTP request and extract user info
    const request = context.switchToHttp().getRequest<ExtendedRequest>();
    const { id, role, userId } = request.user;
    const requestIdParam = +request.params.id; // Convert param to number

    // Ensure userId is present in request parameters
    if (!requestIdParam) {
      throw new Error(`User ID not found in request parameters`);
    }

    // Get roles that require ID matching from custom metadata
    const rolesRequiringIdMatch = this.reflector.get<string[]>(MATCH_ID_USER_KEY, context.getHandler()) || [];

    // If the user's role requires ID matching, check if the user ID matches the request parameter
    if (rolesRequiringIdMatch.includes(role)) {
      const requestUserTokenId = UserRole.CUSTOMER === role ? userId : id; // Use userId for customers, id for other roles
      if (requestIdParam !== requestUserTokenId) {
        // Deny access if IDs do not match
        throw new ForbiddenException(`Access denied for user with ID ${requestIdParam}`);
      }
    }

    // Allow access if checks pass
    return true;
  }
}
