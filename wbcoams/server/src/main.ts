import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { All, ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './filters/all-exceptions.filter';
import { ValidationFilter } from './filters/validation.exceptions.filter';
import * as morgan from 'morgan';
// import { ValidationExceptionFilter } from './filters/validation.exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;

  // Configure Morgan HTTP request logging
  const morganFormat = process.env.NODE_ENV === 'production' ? 'combined' : 'dev';
  app.use(morgan(morganFormat));

  // Enable CORS for all origins
  app.enableCors({
    origin: '*', // Allow all origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allow specific HTTP methods
    allowedHeaders: 'Content-Type, Accept, Authorization', // Allow specific headers
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  });

  // handle exceptions globally
  app.useGlobalFilters(
    // new ValidationExceptionFilter()
    // new ValidationFilter(),
    new AllExceptionsFilter()
  );

  // automatically validate incoming requests based on DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    })
  );

  // Set a global prefix for all routes
  app.setGlobalPrefix('api');

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}/api`);
  });
}
bootstrap();
