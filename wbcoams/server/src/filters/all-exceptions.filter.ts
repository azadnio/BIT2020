// import {
//   ExceptionFilter,
//   Catch,
//   ArgumentsHost,
//   HttpStatus,
//   HttpException,
// } from '@nestjs/common';

// @Catch()
// export class AllExceptionsFilter implements ExceptionFilter {
//   catch(exception: unknown, host: ArgumentsHost) {
//     const ctx = host.switchToHttp();
//     const response = ctx.getResponse();
//     const request = ctx.getRequest();

//     console.error(exception)

//     const status =
//       exception instanceof HttpException
//         ? exception.getStatus()
//         : HttpStatus.INTERNAL_SERVER_ERROR;

//     response.status(status).json({
//       statusCode: status,
//       timestamp: new Date().toISOString(),
//       path: request.url,
//       message: this.getErrorMessage(exception),
//     });
//   }

//   private getErrorMessage(exception: unknown): string {

//     const { code, message } = exception as { code?: string, message?: string };
//     if (code === 'ER_DUP_ENTRY') {
//       return 'Duplicate entry error';
//     }
//     if (code === 'ER_NO_REFERENCED_ROW_2') {
//       return 'Foreign key constraint error';
//     }
//     if (message) {
//       return message;
//     }
//     if (typeof exception === 'string') {
//       return exception;
//     }
//     if (exception instanceof Error) {
//       return exception.message;
//     }
//     return 'Internal server error';
//   }
// }

import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, ValidationError } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let errors: any = null;

    // Handle NestJS HttpException (includes thrown BadRequestException, NotFoundException, etc.)
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
        const res: any = exceptionResponse;
        message = res.message || message;
        // Handle DTO validation errors
        if (Array.isArray(res.message) && res.message[0] instanceof Object && 'constraints' in res.message[0]) {
          errors = res.message.map((err: ValidationError) => ({
            property: err.property,
            constraints: err.constraints,
          }));
          message = 'Validation failed';
        }
      }
    } else if (exception instanceof Error) {
      // Handle generic JS errors
      message = exception.message;
    }

    response.status(status).json({
      statusCode: status,
      message,
      errors,
      timestamp: new Date().toISOString(),
    });
  }
}
