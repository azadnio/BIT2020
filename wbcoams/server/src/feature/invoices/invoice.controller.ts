import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { Roles } from 'src/core/auth/decorators/roles.decorators';
import { MatchIdUser } from 'src/core/auth/decorators/match-id-user.decorators';
import { JwtAuthGuard } from 'src/core/auth/guards/jwt-auth.guard';
import { MatchUserIdGuard } from 'src/core/auth/guards/user-id.guard';
import { RolesGuard } from 'src/core/auth/guards/roles.guard';
import { RequestContextService } from 'src/core/auth/request-context.service';
import { DeleteQueryDto } from 'src/common/dto/delete-query.dto';
import { InvoiceService } from './invoice.service';
import { CereateInvoiceDto } from './dtos/create-invoice.dto';
import { InvoicePaginationDto } from './dtos/invoice-pagination.dto';
import { UpdateInvoiceDto } from './dtos/update-invoice.dto';
import { UserRole } from '@SharedRepo/enums/user-roles.enum';

@Controller('invoice')
@UseGuards(JwtAuthGuard, RolesGuard, MatchUserIdGuard)
export class InvoiceController {
  constructor(
    private readonly invoiceService: InvoiceService,
    private readonly context: RequestContextService
  ) {}

  @Get()
  @Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.STAFF, UserRole.CUSTOMER)
  @UseGuards(RolesGuard)
  async findAll(@Query() query: InvoicePaginationDto) {
    if (this.context.isCustomer()) {
      return this.invoiceService.getCustomerInvoices(this.context.userId, query);
    }
    return this.invoiceService.getAllInvoices(query);
  }

  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.STAFF, UserRole.CUSTOMER)
  @MatchIdUser(UserRole.CUSTOMER)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.invoiceService.getInvoiceById(id);
  }

  @Post()
  @Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.STAFF)
  create(@Body() createInvoiceDto: CereateInvoiceDto) {
    return this.invoiceService.createInvoice(createInvoiceDto);
  }

  @Put(':id')
  @Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.STAFF)
  @MatchIdUser(UserRole.STAFF)
  update(@Param('id') id: string, @Body() updateInvoiceDto: UpdateInvoiceDto) {
    return this.invoiceService.updateInvoice(+id, updateInvoiceDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.STAFF)
  @UseGuards(MatchUserIdGuard)
  async remove(@Param('id', ParseIntPipe) id: number, @Query() query: DeleteQueryDto) {
    await this.invoiceService.deleteInvoice(id, query);
    return { id: +id, deleted: true };
  }
}
