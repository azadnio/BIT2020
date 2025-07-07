import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

import { IUser } from '@SharedRepo/interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserPaginationDto } from './dto/user-query.dto';
import { UserRepository } from './user.repository';
import { moveFile } from 'src/common/utils/file.utils';
import { UserRole } from '@SharedRepo/enums/user-roles.enum';
import { LogService } from 'src/core/log/log.service';
import { RequestContextService } from 'src/core/auth/request-context.service';

@Injectable()
export class UsersService {
  constructor(
    private userRepository: UserRepository,
    private requestContext: RequestContextService,
    private logService: LogService
  ) {}

  private hashPassword(password: string): string {
    const saltRounds = 6;
    return bcrypt.hashSync(password, saltRounds);
  }

  async getUsers(query: UserPaginationDto): Promise<IUser[]> {
    if (query.includeDeleted && this.requestContext.userRole === UserRole.CUSTOMER) {
      throw new BadRequestException('Staffs cannot access deleted users.');
    }

    const users = await this.userRepository.selectAll(query);
    return users;
  }

  async getUserById(userId: number): Promise<IUser | null> {
    const user = await this.userRepository.selectById(userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found.`);
    }
    return user;
  }

  async createUser(
    user: CreateUserDto,
    photoFile: Express.Multer.File,
    skipSelection: boolean,
    isContinueTransaction: boolean
  ): Promise<IUser> {
    await this.validateIncomingUserPayload(user as CreateUserDto);

    (user as IUser).createdUserId = this.requestContext.userId;
    (user as IUser).updatedUserId = this.requestContext.userId;
    user.password = this.hashPassword(user.password);
    user.email = user.email.toLowerCase().trim();

    const result = await this.userRepository.withMultipleTransaction(async () => {
      const userId = await this.userRepository.create(user as IUser);

      if (photoFile) {
        const photo = this.saveUserPhoto(userId, photoFile);
        await this.userRepository.update(userId, { photo } as UpdateUserDto);
        user.photo = photo;
      }

      return skipSelection ? ({ ...user, id: userId } as IUser) : await this.userRepository.selectById(userId);
    }, isContinueTransaction);

    if (!isContinueTransaction) {
      await this.logService.creation(result.id, `User ${result.email} created successfully.`);
    }
    return result;
  }

  async updateUser(
    userId: number,
    user: UpdateUserDto,
    photoFile: Express.Multer.File,
    skipSelection: boolean,
    isContinueTransaction: boolean
  ): Promise<IUser | null> {
    if (!photoFile && Object.keys(user).length === 0) {
      throw new BadRequestException('No fields to update provided.');
    }

    await this.validateIncomingUserPayload(null, user, userId);
    if (user.password) {
      user.password = this.hashPassword(user.password);
    }
    (user as IUser).updatedUserId = this.requestContext.userId;

    const result = await this.userRepository.withMultipleTransaction(async () => {
      if (photoFile) {
        user.photo = this.saveUserPhoto(userId, photoFile);
      }

      const isUpdated = await this.userRepository.update(userId, user as IUser);
      if (!isUpdated) {
        throw new NotFoundException(`User with ID ${userId} not found.`);
      }

      return skipSelection ? null : await this.userRepository.selectById(userId);
    }, !isContinueTransaction);

    if (!isContinueTransaction) {
      await this.logService.updation(userId, `User updated: ${Object.keys(user).join(', ')}`);
    }

    return result;
  }

  async deleteUser(userId: number, deletedBy: number): Promise<void> {
    const isDeleted = await this.userRepository.delete(userId, deletedBy);
    if (!isDeleted) {
      throw new NotFoundException(`User with ID ${userId} not found.`);
    }
    await this.logService.deletion(userId, `User with ID ${userId} deleted successfully.`);
  }

  async findUserByEmail(email: string): Promise<IUser | null> {
    return await this.userRepository.findUserByEmail(email);
  }

  private saveUserPhoto(userId: number, photoFile: Express.Multer.File): string {
    if (!photoFile) {
      return '';
    }
    const extension = photoFile.originalname.split('.').pop();
    const tempFilePath = `uploads/temp/${photoFile.filename}`;
    const newFilePath = `uploads/users/${userId}-${Date.now()}.${extension}`;
    moveFile(tempFilePath, newFilePath);
    return newFilePath;
  }

  private async validateIncomingUserPayload(
    createUserPayload: CreateUserDto = null,
    updateUserPayload: UpdateUserDto = null,
    updateUserId: number = null
  ): Promise<void> {
    const loggedinUserRole = this.requestContext.userRole;
    const userRole = createUserPayload?.role || updateUserPayload?.role;

    if (loggedinUserRole === UserRole.MANAGER && [UserRole.ADMIN, UserRole.MANAGER].includes(userRole)) {
      throw new BadRequestException('you cannot create or update a user with ADMIN or MANAGER role.');
    }

    if (loggedinUserRole === UserRole.STAFF && [UserRole.ADMIN, UserRole.MANAGER, UserRole.STAFF].includes(userRole)) {
      throw new BadRequestException('you cannot create or update a user with ADMIN, MANAGER or STAFF role.');
    }

    //for updating user
    if (updateUserPayload) {
      if (!!updateUserPayload.email) {
        const existingUserEmail = await this.userRepository.selectSingleFeildByUserId<string>(updateUserId, 'email');
        if (existingUserEmail !== updateUserPayload.email.trim().toLowerCase() && loggedinUserRole !== UserRole.ADMIN) {
          throw new BadRequestException('you cannot update email of a user other than yourself.');
        }
      }
    }
  }
}
