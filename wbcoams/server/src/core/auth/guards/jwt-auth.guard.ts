import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ExtendedRequest } from 'src/common/types/extended-request.type';

@Injectable()
// JwtAuthGuard checks for a valid JWT in the Authorization header
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  // Determines if the current request is allowed
  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log('JwtAuthGuard: Validating JWT token');
    // Get the HTTP request object
    const request = context.switchToHttp().getRequest<ExtendedRequest>();
    // Extract JWT token from the Authorization header
    const token = this.extractTokenFromHeader(request);

    // If no token is found, deny access
    if (!token) {
      throw new ForbiddenException('No token provided');
    }

    try {
      // Verify the token using the secret
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      // Attach the payload (user info) to the request object
      (request as unknown as ExtendedRequest).user = payload;

      return true; // Allow the request to proceed
    } catch {
      // If verification fails, deny access
      throw new UnauthorizedException('Invalid token');
    }
  }

  // Helper method to extract the Bearer token from the Authorization header
  private extractTokenFromHeader(request: ExtendedRequest): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
