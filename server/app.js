  
import express from 'express';
import morgan from 'morgan';
import path from 'path';
import cookieParser from 'cookie-parser'
import cors from 'cors';

import AppError from './errors/AppError.js';
import errorController from './controllers/errorController.js'

//Import routers...
import authRouter from './routes/authRoutes.js';
import columnRouter from './routes/columnRoutes.js';

// Start express app
const app = express();

// 1) GLOBAL MIDDLEWARES
// Implement CORS
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
// Access-Control-Allow-Origin *


// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}


//Parsed req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

//Parsed cookie obj..
app.use(cookieParser());

// 3) ROUTES
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/columns', columnRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

//Fallback error controller
app.use(errorController);

export default app;