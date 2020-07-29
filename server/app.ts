import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { UserController, PaymentController, ItemController } from './controller';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(helmet());
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req: Request, res: Response) => res.send('hello world'));
app.post('/', (req: Request, res: Response) =>
	res.send(`I've got this message: "${req.body.data}"`),
);

app.post('/join', UserController.join);

app.get('/payment/:uid', PaymentController.getPaymentsById);
app.post('/payment/create', PaymentController.create);
app.patch('/payment/delete/:uid', PaymentController.delete);

app.get('/item/:uid', ItemController.getPaymentsById);
app.post('/item/create', ItemController.create);
app.patch('/item/update', ItemController.update);
app.get('/item/delete/:uid', ItemController.delete);

app.listen(3000, () => console.log(`✅ server is running on port: ${3000}`));
