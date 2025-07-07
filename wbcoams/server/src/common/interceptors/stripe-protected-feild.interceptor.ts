import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { PROTECTED_UPDATE_FIELDS } from '../constants/prodetected-update-feilds.constant';

@Injectable()
export class StripProtectedFieldsInterceptor implements NestInterceptor {
  private readonly protectedFields = [...PROTECTED_UPDATE_FIELDS];

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    // Modify the INCOMING request body before it reaches the controller
    if (request.body) {
      this.protectedFields.forEach((field) => {
        if (field in request.body) {
          delete request.body[field];
        }
      });
    }

    return next.handle();
  }
}
