import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { CURRENCY, DATE_FMT, DATE_TIME_FMT } from './app.constants';
import { UtilsService } from 'src/app/utils.service';
import { Status, PaymentStatus, OrderStatus, ChequeStatus, ItemUnit, PaymentType } from './sub-modules/common/common.enum';

@Pipe({
    name: 'dateFormat'
})
export class DateFormatPipe extends DatePipe implements PipeTransform {
    override transform(value: any, args?: any): any {
        return super.transform(value, DATE_FMT);
    }
}


@Pipe({
    name: 'dateTimeFormat'
})
export class DateTimeFormatPipe extends DatePipe implements PipeTransform {
    override transform(value: any, args?: any): any {
        return super.transform(value, DATE_TIME_FMT);
    }
}

@Pipe({
    name: 'currencyFormat'
})
export class CurrencyFormatPipe extends CurrencyPipe implements PipeTransform {
    override transform(value: any, args?: any): any {
        let val = super.transform(value.toString(), CURRENCY, 'code')?.split('.') || '0.00';
        return val[0] + val[1] + '.<small>' + val[2] + '</small>';
    }
}

@Pipe({
    name: 'phoneNumber'
})
export class PhoneNumberFormatPipe implements PipeTransform {
    transform(value: string, args?: any): any {
        return value.slice(0, 3) + '-' + value.slice(3);
    }
}

@Pipe({
    name: 'entityStatusString'
})
export class EntityStatusFormatPipe implements PipeTransform {

    constructor(private utils: UtilsService){}

    transform(value: Status, args?: any): any {
        return this.utils.statusString(value)
    }
}

@Pipe({
    name: 'paymentTypeString'
})
export class PaymentTypeStringPipe implements PipeTransform {

    constructor(private utils: UtilsService) { }

    transform(value: PaymentType, args?: any): any {
        return this.utils.paymentTypeString(value)
    }
}

@Pipe({
    name: 'oderStatusString'
})
export class OderStatusStringPipe implements PipeTransform {

    constructor(private utils: UtilsService) { }

    transform(value: OrderStatus, args?: any): any {
        return this.utils.oderStatusString(value)
    }
}

@Pipe({
    name: 'chequeStatusesToString'
})
export class ChequeStatusesToStringPipe implements PipeTransform {

    constructor(private utils: UtilsService) { }

    transform(value: ChequeStatus, args?: any): any {
        return this.utils.chequeStatusesToString(value)
    }
}

@Pipe({
    name: 'ItemUnitsToString'
})
export class ItemUnitsToStringPipe implements PipeTransform {

    constructor(private utils: UtilsService) { }

    transform(value: ItemUnit, args?: any): any {
        return this.utils.itemUnitsToString(value)
    }
}
