/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction } from 'express';
import cors from 'cors'
import express, { Application, Request, Response } from 'express'
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
const app:Application = express()


//parser
app.use(express.json());
app.use(cors())
app.get('/', (req:Request, res:Response) => {
  res.send('Hello World!')
})

app.use('/api/v1/',router)

app.use(globalErrorHandler)
app.use(notFound)

export default app