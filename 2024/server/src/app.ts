// src/app.ts
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { AppError } from './models/apperror';
// import { userRoutes } from './routes/userRoutes';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

dotenv.config();
console.log(process.env.PORT);

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());
// app.use('/api/users', userRoutes);
  
// Error handling middleware
app.use((err: AppError, req: Request, res: Response, next: NextFunction): void => {
  console.error(err);

  res
    .status(err.status || StatusCodes.INTERNAL_SERVER_ERROR)
    .json(err.message || ReasonPhrases.INTERNAL_SERVER_ERROR);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
