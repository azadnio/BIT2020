import {
  Controller,
  Post,
  Get,
  Body,
  Query,
  UseGuards,
  ParseIntPipe,
  Put,
  Req,
  Param,
  UseInterceptors,
  Delete,
  UploadedFile,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { JwtAuthGuard } from 'src/core/auth/guards/jwt-auth.guard';
import { Roles } from 'src/core/auth/decorators/roles.decorators';
import { CreateCustomerDto } from './dtos/create-customer.dto';
import { ExtendedRequest } from 'src/common/types/extended-request.type';
import { UpdateCustomerDto } from './dtos/update-customer.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { filterCustomerResponse } from './utils/customer.utils';
import { StripProtectedFieldsInterceptor } from 'src/common/interceptors/stripe-protected-feild.interceptor';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserRole } from '@SharedRepo/enums/user-roles.enum';
import { RolesGuard } from 'src/core/auth/guards/roles.guard';

@Controller('customers')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CustomersController {
  constructor(private readonly service: CustomersService) {}

  @Get()
  @Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.STAFF)
  async getCustomers(@Query() query: PaginationDto) {
    const customers = await this.service.getCustomers(query);
    return filterCustomerResponse(customers);
  }

  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.STAFF)
  async getCustomerById(@Param('id', ParseIntPipe) id: number) {
    const customer = await this.service.getCustomerById(id);
    return filterCustomerResponse(customer);
  }

  @Post()
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @UseInterceptors(FileInterceptor('photo'))
  async create(@Body() customer: CreateCustomerDto, @UploadedFile() photo: Express.Multer.File) {
    const newCustomer = await this.service.createCustomer(customer, photo);
    return filterCustomerResponse(newCustomer);
  }

  @UseInterceptors(StripProtectedFieldsInterceptor, FileInterceptor('photo'))
  @Put(':id')
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() customer: UpdateCustomerDto,
    @UploadedFile() photo?: Express.Multer.File
  ) {
    const updatedCustomer = await this.service.updateCustomer(id, customer, false, photo);
    return filterCustomerResponse(updatedCustomer);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.service.deleteCustomer(id);
    return { id, deleted: true };
  }
}
