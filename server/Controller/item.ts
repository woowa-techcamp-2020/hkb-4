import { Request, Response, NextFunction } from 'express';
import Item from '../model/item';
import httpStatus from 'http-status';
import { JsonResponse } from '../module/util';

const ItemController = {
	create: async (req: Request, res: Response, next: NextFunction) => {
		let response;
		let { body } = req;
		try {
			response = await Item.create(body);
			console.log('asdf', response);
			res
				.status(httpStatus.CREATED)
				.json(JsonResponse(httpStatus.CREATED, 'card created well', response));
		} catch (err) {
			next(err);
		}
	},
	delete: async () => {},
	update: async () => {},
	getPaymentsById: async () => {},
};

export default ItemController;
