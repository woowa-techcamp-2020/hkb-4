import { Request, Response, NextFunction } from 'express';
import Payment from '../model/payment';
import httpStatus from 'http-status';
import { JsonResponse } from '../module/util';

const PaymentController = {
	create: async (req: Request, res: Response, next: NextFunction) => {
		let response;
		// @ts-ignore
		const uid = req.user.id;
		const { body } = req;
		try {
			response = await Payment.create({ uid_payment: uid, ...body });
			res
				.status(httpStatus.CREATED)
				.json(JsonResponse(httpStatus.CREATED, 'payment created well', response));
		} catch (err) {
			next(err);
		}
	},
	delete: async (req: Request, res: Response, next: NextFunction) => {
		let response;
		const id = parseInt(req.params.id);
		try {
			response = await Payment.delete(id);
			res.status(httpStatus.OK).json(JsonResponse(httpStatus.OK, 'payment deleted well', response));
		} catch (err) {
			next(err);
		}
	},
	getPaymentsById: async (req: Request, res: Response, next: NextFunction) => {
		let response;
		// @ts-ignore
		const uid = req.user.id;
		try {
			response = await Payment.getPaymentsById(uid);
			const responseDict = {};
			response.forEach(payment => {
				responseDict[payment.id] = payment.name;
			});
			res
				.status(httpStatus.OK)
				.json(JsonResponse(httpStatus.OK, 'payments get well', responseDict));
		} catch (err) {
			next(err);
		}
	},
};

export default PaymentController;
