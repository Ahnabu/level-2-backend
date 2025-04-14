
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Application, Request, Response,NextFunction } from 'express'

const app:Application = express()


const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.status || 500;
    const errorMessage = err.message || 'Internal Server Error';
  
    res.status(statusCode).json({
      success: false,
      message: errorMessage,
      stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
    });
}
  
export default globalErrorHandler;