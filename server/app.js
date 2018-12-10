import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import path from 'path';
import morgan from 'morgan';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import baseRouter from './router/baseRouter';

dotenv.config();

const app = express();

const swaggerDocument = YAML.load(`${process.cwd()}/swagger.yaml`);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1', baseRouter);
app.use(express.static(path.join(__dirname, '..', '/client/public')));
app.get('/', (request, response) => {
  response.sendFile(path.join(__dirname, '..', '/client/public/index.html'));
});
app.use('*', (request, response) => response.status(404).json({
  status: 'fail',
  message: 'This route is yet to be specified.'
}));

const port = process.env.PORT || 8000;
console.log(process.env.PORT, process.env.API_BASE_URL);

app.listen(port, () => console.log(`server is active on port ${port}`));

export default app;
