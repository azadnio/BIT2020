import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
// import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import { ConfigService } from '@nestjs/config';
// import { filterUserResponse } from 'src/users/utils/users.utils';
// import { CustomersService } from 'src/customers/customers.service';
import { JwtPayload } from '@SharedRepo/interfaces/jwt-payload.interface';
import { UserRole } from '@SharedRepo/enums/user-roles.enum';
import { CustomersService } from 'src/feature/customers/customers.service';
import { UsersService } from 'src/feature/users/users.service';
import { filterUserResponse } from 'src/feature/users/utils/users.utils';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly customerService: CustomersService
  ) {}

  // User login method
  async login({ email, password }) {
    let user = await this.usersService.findUserByEmail(email); // Find user by email
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException(); // Throw if user not found or password incorrect
    }

    const tokenPayload: JwtPayload = {
      id: user.id,
      role: user.role as UserRole,
      email: user.email,
    };

    // If user is a customer, get customer details
    if (user.role === UserRole.CUSTOMER) {
      const customer = await this.customerService.getCustomerByUserId(user.id);
      if (!customer) {
        throw new UnauthorizedException('Customer not found');
      }
      user = { ...user, ...customer };
      tokenPayload.userId = customer.userId; // Use user ID for JWT payload
      tokenPayload.id = customer.id; // Use customer ID for JWT payload
    }

    // Generate JWT access token
    const accessToken = this.jwtService.sign(tokenPayload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: this.configService.get<string>('JWT_EXPIRATION_TIME') || '3h',
    });

    // Return access token and filtered user info
    return {
      access_token: accessToken,
      user: filterUserResponse(user),
    };
  }

  // User logout method
  async logout(userId: number) {
    // Invalidate the user's session or token here

    // This could involve removing the token from a database or cache

    // For simplicity, we will just return a message
    return { message: 'User logged out' };
  }
}
