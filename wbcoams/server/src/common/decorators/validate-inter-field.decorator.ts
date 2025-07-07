import { applyDecorators } from '@nestjs/common';
import { IsNotEmpty, IsNumber, IsOptional, Max, Min, ValidationArguments } from 'class-validator';

interface IntegerFieldOptions {
  min?: number;
  max?: number;
  required?: boolean;
}

export function ValidateIntegerField(options?: IntegerFieldOptions) {
  const { min = 0, max = Number.MAX_SAFE_INTEGER, required = true } = options || {};

  const decorators = [
    IsNumber(
      {},
      {
        message: (args: ValidationArguments) => `${args.property} must be a valid number.`,
      }
    ),
    Min(min, {
      message: (args: ValidationArguments) => `${args.property} must be at least ${min}.`,
    }),
    Max(max, {
      message: (args: ValidationArguments) => `${args.property} must not exceed ${max}.`,
    }),
  ];

  if (required) {
    decorators.unshift(
      IsNotEmpty({
        message: (args: ValidationArguments) => `${args.property} is required.`,
      })
    );
  } else {
    decorators.push(IsOptional());
  }

  return applyDecorators(...decorators);
}
