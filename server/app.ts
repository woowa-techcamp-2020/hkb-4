import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { UserController, PaymentController, ItemController } from './controller';

import session from 'express-session';
import passport from 'passport';
import passportConfig from './config/passport';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(helmet());
app.use(morgan('dev'));
app.use(
	cors({
		origin: 'http://localhost:8080',
		methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
		allowedHeaders: ['Content-Type'],
		credentials: true,
	}),
);
app.use(bodyParser.json());

app.use(
	session({
		secret: 'asldkjfqoiue0182uewfjoln',
		resave: false,
		saveUninitialized: true,
	}),
);

app.use(passport.initialize());
app.use(passport.session());

passportConfig();

app.get('/', (req: Request, res: Response) => {});

app.post('/join', UserController.join);
app.post('/login', passport.authenticate('local'), UserController.postLogin);
app.get('/logout', UserController.logout);
app.get('/getUser', UserController.getUser);

app.get('/payment', PaymentController.getPaymentsById);
app.post('/payment/create', PaymentController.create);
app.patch('/payment/delete/:id', PaymentController.delete);

app.get('/item/:date', ItemController.getItemsByDate);
app.post('/item/create', ItemController.create);
app.patch('/item/update', ItemController.update);
app.patch('/item/delete/:id', ItemController.delete);

app.listen(PORT, () => console.log(`✅ server is running on port: ${PORT}`));
