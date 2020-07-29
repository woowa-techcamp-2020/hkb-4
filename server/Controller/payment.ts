import { Request, Response, NextFunction } from 'express';
import Payment from '../model/payment';
import httpStatus from 'http-status';
import { JsonResponse } from '../module/util';

const PaymentController = {
	create: async (req: Request, res: Response, next: NextFunction) => {
		let response;
		let { body } = req;
		try {
			response = await Payment.create(body);
			res
				.status(httpStatus.CREATED)
				.json(JsonResponse(httpStatus.CREATED, 'payment created well', response));
		} catch (err) {
			next(err);
		}
	},
	delete: async (req: Request, res: Response, next: NextFunction) => {
		let response;
		const uid = parseInt(req.params.uid);
		try {
			response = await Payment.delete(uid);
			res.status(httpStatus.OK).json(JsonResponse(httpStatus.OK, 'payment deleted well', response));
		} catch (err) {
			next(err);
		}
	},
	getPaymentsById: async (req: Request, res: Response, next: NextFunction) => {
		let response;
		const uid = parseInt(req.params.uid);
		try {
			response = await Payment.getPaymentsById(uid);
			res.status(httpStatus.OK).json(JsonResponse(httpStatus.OK, 'payments get well', response));
		} catch (err) {
			next(err);
		}
	},
};

export default PaymentController;
