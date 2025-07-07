import {
  Controller,
  Post,
  Get,
  Body,
  Query,
  UseGuards,
  Req,
  Param,
  ParseIntPipe,
  NotFoundException,
  Put,
  Delete,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from 'src/core/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/core/auth/guards/roles.guard';
import { UserRole } from '@SharedRepo/enums/user-roles.enum';
import { Roles } from 'src/core/auth/decorators/roles.decorators';
import { OrderPaginationDto } from './dtos/order-pagination.dt';
import { ExtendedRequest } from 'src/common/types/extended-request.type';
import { CreateOrderDto } from './dtos/create-order.dto';
import { UpdateOrderDto } from './dtos/update-order.dto';

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(private readonly service: OrdersService) {}

  @Get()
  @Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.STAFF, UserRole.CUSTOMER)
  @UseGuards(RolesGuard)
  async findAll(@Query() query: OrderPaginationDto) {
    return this.service.getAllOrders(query);
  }

  @Get(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.STAFF, UserRole.CUSTOMER)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.getOrderById(id);
  }

  @Post()
  @Roles(UserRole.CUSTOMER)
  @UseGuards(RolesGuard)
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.service.createOrder(createOrderDto);
  }

  @Put(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.CUSTOMER, UserRole.ADMIN, UserRole.MANAGER, UserRole.STAFF)
  update(@Param('id', ParseIntPipe) id: number, @Body() updateOrderDto: UpdateOrderDto) {
    return this.service.updateOrder(id, updateOrderDto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.CUSTOMER, UserRole.ADMIN, UserRole.MANAGER, UserRole.STAFF)
  delete(@Param('id', ParseIntPipe) id: number, @Req() req: ExtendedRequest) {
    return this.service.deleteOrder(id, req);
  }
}
