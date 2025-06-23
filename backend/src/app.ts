
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, Response } from 'express';

import notFound from './app/middlewares/notFound';
import router from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorHandler';

const app: Application = express();

//parsers
app.use(express.json());

app.use(cors({ origin: 'http://localhost:5173',credentials:true }));

app.use(cookieParser());

// application routes
app.use('/api/v1', router);

app.get('/', (req, res: Response) => {
    res.send('Welcome to the University Management System, The server is running successfully!');
}
);

app.use(globalErrorHandler);

//Not Found
app.use(notFound);

export default app;