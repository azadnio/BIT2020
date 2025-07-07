import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { StripProtectedFieldsInterceptor } from 'src/common/interceptors/stripe-protected-feild.interceptor';
import { filterUserResponse } from './utils/users.utils';
import { IUser } from '@SharedRepo/interfaces/user.interface';
import { UserPaginationDto } from './dto/user-query.dto';
import { JwtAuthGuard } from 'src/core/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/core/auth/guards/roles.guard';
import { Roles } from 'src/core/auth/decorators/roles.decorators';
import { UserRole } from '@SharedRepo/enums/user-roles.enum';
import { ExtendedRequest } from 'src/common/types/extended-request.type';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';

// Controller for user-related endpoints
@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Get a paginated list of users
  @Get()
  @Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.STAFF)
  async getUsers(@Query() query: UserPaginationDto, @Req() req: ExtendedRequest) {
    const users = await this.usersService.getUsers(query);
    return filterUserResponse(users);
  }

  // Get a user by ID
  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.STAFF)
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    const user = await this.usersService.getUserById(id);
    return filterUserResponse(user);
  }

  // Create a new user
  @Post()
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @UseInterceptors(FileInterceptor('photo'))
  async createUser(@UploadedFile() photo: Express.Multer.File, @Body() createUserDto: CreateUserDto) {
    const newUser = await this.usersService.createUser(createUserDto, photo, false, true);
    return filterUserResponse(newUser);
  }

  // Update an existing user
  @UseInterceptors(StripProtectedFieldsInterceptor)
  @Put(':id')
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @UseInterceptors(FileInterceptor('photo'))
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() photo: Express.Multer.File,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req: ExtendedRequest
  ) {
    const updatedUser = await this.usersService.updateUser(id, updateUserDto, photo, false, false);
    return filterUserResponse(updatedUser);
  }

  // Delete a user by ID
  @Delete(':id')
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  async deleteUser(@Param('id', ParseIntPipe) id: number, @Req() req: ExtendedRequest) {
    await this.usersService.deleteUser(id, req.user.id);
    return { id, deleted: true };
  }
}
