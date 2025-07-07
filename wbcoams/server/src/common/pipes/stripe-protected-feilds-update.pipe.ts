// strip-fields.pipe.ts
import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { PROTECTED_UPDATE_FIELDS } from '../constants/prodetected-update-feilds.constant';

@Injectable()
export class StripProtectedUpdateFieldsPipe implements PipeTransform {
  private readonly protectedFields = PROTECTED_UPDATE_FIELDS;

  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type === 'body') {
      this.protectedFields.forEach((field) => {
        if (value[field] !== undefined) {
          delete value[field];
        }
      });
    }
    return value;
  }
}
