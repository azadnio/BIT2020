import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { CURRENCY, DATE_FMT, DATE_TIME_FMT } from '../../app.constants';
import { UtilsService } from 'src/app/utils.service';
import { Status } from 'src/app/common.enum';

@Pipe({
    name: 'dateFormat'
})
export class DateFormatPipe extends DatePipe implements PipeTransform {
    transform(value: any, args?: any): any {
        return super.transform(value, DATE_FMT);
    }
}


@Pipe({
    name: 'dateTimeFormat'
})
export class DateTimeFormatPipe extends DatePipe implements PipeTransform {
    transform(value: any, args?: any): any {
        return super.transform(value, DATE_TIME_FMT);
    }
}

@Pipe({
    name: 'currencyFormat'
})
export class CurrencyFormatPipe extends CurrencyPipe implements PipeTransform {
    transform(value: any, args?: any): any {
        return super.transform(value.toString(), CURRENCY, 'code');
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