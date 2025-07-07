// import {
//   ExceptionFilter,
//   Catch,
//   ArgumentsHost,
//   HttpStatus,
// } from '@nestjs/common';
// import { ValidationError } from 'class-validator';
// import { Response } from 'express';

// @Catch(ValidationError)
// export class ValidationExceptionFilter implements ExceptionFilter {
//   catch(exception: ValidationError, host: ArgumentsHost) {
//     console.error('Validation error:', exception);
//     const ctx = host.switchToHttp();
//     const response = ctx.getResponse<Response>();

//     if (exception instanceof ValidationError) {
//       const errors = this.flattenValidationErrors(exception);
//       response.status(HttpStatus.BAD_REQUEST).json({
//         statusCode: HttpStatus.BAD_REQUEST,
//         message: 'Validation failed',
//         errors,
//         timestamp: new Date().toISOString(),
//       });
//     } else {
//       response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
//         statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
//         message: 'Internal server error',
//         timestamp: new Date().toISOString(),
//       });
//     }
//   }

//   private flattenValidationErrors(
//     exception: ValidationError,
//   ): Record<string, string[]> {
//     const result: Record<string, string[]> = {};

//     if (exception.constraints) {
//       result[exception.property] = Object.values(exception.constraints);
//     }

//     if (exception.children && exception.children.length > 0) {
//       exception.children.forEach((child) => {
//         const childErrors = this.flattenValidationErrors(child);
//         Object.assign(result, childErrors);
//       });
//     }

//     return result;
//   }
// }

// src/filters/validation.filter.ts
import { ExceptionFilter, Catch, ArgumentsHost, BadRequestException } from '@nestjs/common';
import { Response } from 'express';
import { ValidationError } from 'class-validator';

interface IValidationError {
  property: string;
  constraints: { [key: string]: string };
  children?: IValidationError[];
}

@Catch(BadRequestException)
export class ValidationFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const exceptionResponse = exception.getResponse();

    const errors = this.formatValidationErrors(exceptionResponse);

    response.status(400).json({
      statusCode: 400,
      error: 'Bad Request',
      message: 'Validation failed',
      errors,
      timestamp: new Date().toISOString(),
      path: ctx.getRequest().url,
    });
  }

  private formatValidationErrors(errors: any): any[] {
    if (!errors?.message) return [];

    if (Array.isArray(errors.message)) {
      return errors.message.map((error: ValidationError) => ({
        field: error.property,
        messages: error.constraints ? Object.values(error.constraints) : ['Invalid value'],
        ...(error.children && error.children.length > 0
          ? { children: this.formatValidationErrors({ message: error.children }) }
          : {}),
      }));
    }

    return [{ message: errors.message }];
  }
}
