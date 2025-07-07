import { applyDecorators } from '@nestjs/common';
import { IsNotEmpty, IsString, MinLength, MaxLength, ValidationArguments, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { CapitalizePipe } from '../pipes/capitalize.pipe';

interface StringFieldOptions {
  minLength?: number;
  maxLength?: number;
  required?: boolean;
  capitalized?: boolean;
}

export function ValidateStringField(options?: StringFieldOptions) {
  const { minLength = 3, maxLength = 50, required = true, capitalized = false } = options || {};

  const decorators = [
    IsString({
      message: (args: ValidationArguments) => `${args.property} must be a string.`,
    }),
    MinLength(minLength, {
      message: (args: ValidationArguments) => `${args.property} must be at least ${args.constraints[0]} characters.`,
    }),
    MaxLength(maxLength, {
      message: (args: ValidationArguments) => `${args.property} must not exceed ${args.constraints[0]} characters.`,
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

  if (capitalized) {
    decorators.push(Transform(({ value }) => new CapitalizePipe().transform(value)));
  }

  return applyDecorators(...decorators);
}
