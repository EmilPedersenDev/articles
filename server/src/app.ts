// Packages
import express, { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import path from 'path';
import xss from 'xss-clean';

// Files
import userRouter from './routes/user-route';
import authRouter from './routes/auth-route';
import AppError from './helpers/app-error';
import errorController from './controllers/error-controller';

const app = express();

// Middlewares
app.use(helmet());
app.use(logger('dev'));
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(xss());

// All server routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/auth', authRouter);

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome',
  });
});

// Catch undefined routes
app.all('*', (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Cant find ${req.originalUrl} on this server`, 404));
});

// Catching all errors
app.use(errorController);

export default app;
