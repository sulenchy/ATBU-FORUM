import express from 'express';

const defaultRouter = express.Router();

defaultRouter.get('/', (request, response) => response.status(200).json({
  status: 'success',
  message: 'Welcome to StackOverFlow-Lite'
}));

export default defaultRouter;
