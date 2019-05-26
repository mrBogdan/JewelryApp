import express = require('express');
import { Express } from 'express';
import userRouter from './user.router';

const app: Express = express();

app.use('/user', userRouter);


export default app;
