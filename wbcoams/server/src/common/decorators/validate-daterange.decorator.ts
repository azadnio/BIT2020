/* eslint-disable @typescript-eslint/no-unused-vars */
// src/common/decorators/date-range.decorator.ts
import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsDateRangeValid(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'IsDateRangeValid',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const fromDate = (args.object as any).from;
          const toDate = (args.object as any).to;

          // If both dates exist, check if to >= from
          if (fromDate && toDate) {
            return toDate >= fromDate;
          }

          // Valid if one or both dates are missing
          return true;
        },
        defaultMessage(args: ValidationArguments) {
          return 'To date must be greater than or equal to From date';
        },
      },
    });
  };
}
