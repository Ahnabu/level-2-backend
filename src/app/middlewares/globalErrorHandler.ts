
/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Application, Request, Response,NextFunction, ErrorRequestHandler } from 'express'
import { ZodError, ZodIssue } from 'zod';
import { TErrorSource } from '../interface/error';
import handleZodError from '../errors/handleZodErrors';
import handleValidationError from '../errors/handleValidationError';

const app:Application = express()


const globalErrorHandler: ErrorRequestHandler = (err, req, res, next)=> {
  let statusCode = err.status || 500;
  let message = err.message || 'Internal Server Error';
 
  let errorSources: TErrorSource = [{
    path: '',
    message: "something went wrong"
  }]

  

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  
      
  } else if (err.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  }
res.status(statusCode).json({
      success: false,
      message: message,
      stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
      error: errorSources,
    });
}


  
export default globalErrorHandler;