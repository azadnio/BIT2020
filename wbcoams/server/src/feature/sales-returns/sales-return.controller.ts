import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
  ParseIntPipe,
  NotFoundException,
  Req,
} from '@nestjs/common';
import { ExtendedRequest } from 'src/common/types/extended-request.type';
import { Roles } from 'src/core/auth/decorators/roles.decorators';
import { UserRole } from '@SharedRepo/enums/user-roles.enum';
import { MatchIdUser } from 'src/core/auth/decorators/match-id-user.decorators';
import { JwtAuthGuard } from 'src/core/auth/guards/jwt-auth.guard';
import { MatchUserIdGuard } from 'src/core/auth/guards/user-id.guard';
import { RolesGuard } from 'src/core/auth/guards/roles.guard';
import { DeleteQueryDto } from 'src/common/dto/delete-query.dto';
import { SalesReturnDto } from './dtos/update-invoice.dto';
import { SalesReturnPaginationDto } from './dtos/sales-return-pagination.dto';
import { SalesReturnService } from './sales-return.service';
import { CreateSalesReturnDto } from './dtos/create-sales-return.dto';

@Controller('sales-returns')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SalesReturnController {
  constructor(private readonly salesReturnService: SalesReturnService) {}

  @Get()
  @Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.STAFF, UserRole.CUSTOMER)
  @UseGuards(RolesGuard)
  async findAll(@Query() query: SalesReturnPaginationDto) {
    return this.salesReturnService.getAllSalesReturns(query);
  }

  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.STAFF, UserRole.CUSTOMER)
  @UseGuards(MatchUserIdGuard)
  @MatchIdUser(UserRole.CUSTOMER)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.salesReturnService.getSalesReturnById(id);
  }

  @Post()
  @Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.STAFF)
  create(@Body() newSalesReturnData: CreateSalesReturnDto) {
    return this.salesReturnService.createSalesReturns(newSalesReturnData);
  }

  @Put(':id')
  @Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.STAFF)
  @MatchIdUser(UserRole.STAFF)
  update(@Param('id', ParseIntPipe) id: number, @Body() updateSalesReturnDto: SalesReturnDto) {
    return this.salesReturnService.updateSalesReturn(id, updateSalesReturnDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.STAFF)
  @UseGuards(MatchUserIdGuard)
  remove(@Param('id', ParseIntPipe) id: number, @Query() query: DeleteQueryDto) {
    return this.salesReturnService.deleteSalesReturn(id, query);
  }
}
