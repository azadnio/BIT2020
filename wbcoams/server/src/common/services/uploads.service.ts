import { Injectable, OnModuleInit } from '@nestjs/common';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';

@Injectable()
export class UploadsService implements OnModuleInit {
  private readonly uploadsPath = join(process.cwd(), 'uploads');

  onModuleInit() {
    this.ensureUploadsDirectoryExists();
    this.createTestFile();
  }

  private ensureUploadsDirectoryExists() {
    const subdirectories = [
      'products',
      'users',
      'customer',
      'brand',
      'temp',
      'documents',
      'invoices',
      'reports'
    ];

    // Ensure main uploads directory exists
    if (!existsSync(this.uploadsPath)) {
      mkdirSync(this.uploadsPath, { recursive: true });
      console.log('✅ Created uploads directory');
    }

    // Ensure subdirectories exist
    subdirectories.forEach(subdir => {
      const subdirPath = join(this.uploadsPath, subdir);
      if (!existsSync(subdirPath)) {
        mkdirSync(subdirPath, { recursive: true });
        console.log(`✅ Created uploads/${subdir} directory`);
      }
    });

    console.log('📁 Uploads directory structure ready');
  }

  private createTestFile() {
    const testFilePath = join(this.uploadsPath, 'test.txt');
    const testContent = `Uploads folder is working!
Created: ${new Date().toISOString()}
Access this file at: http://localhost:3000/uploads/test.txt`;

    writeFileSync(testFilePath, testContent);
    console.log('✅ Test file created at /uploads/test.txt');
  }

  getUploadsPath(subPath?: string): string {
    return subPath ? join(this.uploadsPath, subPath) : this.uploadsPath;
  }

  getPublicUrl(fileName: string, subPath?: string): string {
    const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
    const filePath = subPath ? `${subPath}/${fileName}` : fileName;
    return `${baseUrl}/uploads/${filePath}`;
  }
}
