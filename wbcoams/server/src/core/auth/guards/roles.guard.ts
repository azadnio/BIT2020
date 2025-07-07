import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorators';
import { ExtendedRequest } from 'src/common/types/extended-request.type';

@Injectable()
// RolesGuard checks if the current user has the required roles to access a route
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  // Determines if the current request can proceed based on user roles
  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log('RolesGuard: Checking user roles');
    // Get the required roles from the route's metadata
    const requiredRoles = this.reflector.get<string[]>(ROLES_KEY, context.getHandler());

    // If no roles are required, allow access
    if (!requiredRoles) return true;

    // Get the request and user object
    const request = context.switchToHttp().getRequest<ExtendedRequest>();
    const { user } = request;

    // If user is not authenticated, deny access
    if (!user) {
      throw new ForbiddenException('User not authenticated');
    }

    // Check if user has at least one of the required roles
    const hasRole = requiredRoles.some((role) => user.role?.includes(role));
    if (!hasRole) {
      throw new ForbiddenException('Insufficient permissions');
    }

    // Allow access
    return true;
  }
}
