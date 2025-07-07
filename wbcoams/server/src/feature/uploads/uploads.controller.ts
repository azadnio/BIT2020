import { Controller, Get, Post, UseInterceptors, UploadedFile, Param, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { existsSync } from 'fs';
import { UploadsService } from '../../common/services/uploads.service';

@Controller('upload-manager')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  @Get('test')
  testUploads() {
    return {
      message: 'Uploads folder is working!',
      uploadsPath: this.uploadsService.getUploadsPath(),
      testFileUrl: this.uploadsService.getPublicUrl('test.txt'),
      timestamp: new Date().toISOString(),
      instructions: {
        'Access test file': 'Visit /uploads/test.txt in your browser',
        'Upload file': 'POST to /api/uploads/file with form-data file',
        'Upload to subdirectory': 'POST to /api/uploads/file/products (or users, customer, etc.)',
      }
    };
  }

  @Get('debug/products/:filename')
  debugProductFile(@Param('filename') filename: string) {
    const filePath = join(process.cwd(), 'uploads', 'products', filename);
    const altPath = join(__dirname, '..', '..', '..', 'uploads', 'products', filename);
    
    return {
      filename,
      currentWorkingDirectory: process.cwd(),
      __dirname,
      calculatedPath: filePath,
      alternativePath: altPath,
      fileExists: existsSync(filePath),
      altFileExists: existsSync(altPath),
      uploadsServicePath: this.uploadsService.getUploadsPath(),
    };
  }

  @Post('file')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads/temp',
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = extname(file.originalname);
        const filename = `${file.fieldname}-${uniqueSuffix}${ext}`;
        callback(null, filename);
      },
    }),
    fileFilter: (req, file, callback) => {
      if (!file.mimetype.match(/\/(jpg|jpeg|png|gif|pdf|doc|docx|txt)$/)) {
        return callback(new BadRequestException('Only image and document files are allowed!'), false);
      }
      callback(null, true);
    },
    limits: {
      fileSize: 10 * 1024 * 1024, // 10MB limit
    },
  }))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    return {
      message: 'File uploaded successfully',
      file: {
        originalName: file.originalname,
        filename: file.filename,
        size: file.size,
        mimetype: file.mimetype,
        publicUrl: this.uploadsService.getPublicUrl(file.filename, 'temp'),
      }
    };
  }

  @Post('file/:category')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: (req, file, callback) => {
        const category = req.params.category;
        const allowedCategories = ['products', 'users', 'customer', 'brand', 'temp', 'documents', 'invoices', 'reports'];
        
        if (!allowedCategories.includes(category)) {
          return callback(new BadRequestException('Invalid category'), null);
        }
        
        callback(null, `./uploads/${category}`);
      },
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = extname(file.originalname);
        const filename = `${file.fieldname}-${uniqueSuffix}${ext}`;
        callback(null, filename);
      },
    }),
    fileFilter: (req, file, callback) => {
      if (!file.mimetype.match(/\/(jpg|jpeg|png|gif|pdf|doc|docx|txt)$/)) {
        return callback(new BadRequestException('Only image and document files are allowed!'), false);
      }
      callback(null, true);
    },
    limits: {
      fileSize: 10 * 1024 * 1024, // 10MB limit
    },
  }))
  uploadFileToCategory(@UploadedFile() file: Express.Multer.File, @Param('category') category: string) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    return {
      message: `File uploaded successfully to ${category}`,
      file: {
        originalName: file.originalname,
        filename: file.filename,
        size: file.size,
        mimetype: file.mimetype,
        category: category,
        publicUrl: this.uploadsService.getPublicUrl(file.filename, category),
      }
    };
  }
}
