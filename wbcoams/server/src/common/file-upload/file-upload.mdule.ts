import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ensureDirectoryExists } from '../utils/file.utils';

@Module({
  imports: [
    MulterModule.registerAsync({
      useFactory: () => {
        // Ensure upload directories exist
        ensureDirectoryExists('./uploads/product');
        ensureDirectoryExists('./uploads/customer');
        ensureDirectoryExists('./uploads/users');
        ensureDirectoryExists('./uploads/temp');
        ensureDirectoryExists('./uploads/brand');

        return {
          storage: diskStorage({
            // Set upload destination
            destination: (req, file, cb) => {
              const uploadPath = `./uploads/temp`;
              cb(null, uploadPath);
            },
            // Set unique filename
            filename: (req, file, cb) => {
              const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
              cb(null, `${file.fieldname}-${uniqueSuffix}${file.originalname}`);
            },
          }),
          // Limit file size to 5MB
          limits: {
            fileSize: 5 * 1024 * 1024,
          },
          // Only allow image files
          fileFilter: (req, file, cb) => {
            const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/bmp', 'image/jpg'];
            if (!allowedTypes.includes(file.mimetype)) {
              return cb(new Error('Only image files are allowed!'), false);
            }
            cb(null, true);
          },
        };
      },
    }),
  ],
  exports: [MulterModule],
})
export class FileUploadModule {}
