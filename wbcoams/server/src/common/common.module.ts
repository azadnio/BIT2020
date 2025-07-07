import { Module, Global } from '@nestjs/common';
import { UploadsService } from './services/uploads.service';

@Global()
@Module({
  providers: [UploadsService],
  exports: [UploadsService],
})
export class CommonModule {}
