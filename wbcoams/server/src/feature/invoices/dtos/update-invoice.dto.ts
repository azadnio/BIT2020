import { PartialType } from '@nestjs/mapped-types';
import { CereateInvoiceDto } from './create-invoice.dto';

export class UpdateInvoiceDto extends PartialType(CereateInvoiceDto) {}
