import express from 'express';
import questionRouter from './questionRouter';
import answerRouter from './answerRouter';
import userRouter from './userRouter';
import voteRouter from './voteRouter';
import defaultRouter from './defaultRouter';

const baseRouter = express.Router();
baseRouter.use(questionRouter, answerRouter, userRouter, voteRouter, defaultRouter);

export default baseRouter;
