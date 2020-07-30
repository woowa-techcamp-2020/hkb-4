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
			res
				.status(httpStatus.CREATED)
				.json(JsonResponse(httpStatus.CREATED, 'item created well', response));
		} catch (err) {
			next(err);
		}
	},
	delete: async (req: Request, res: Response, next: NextFunction) => {
		let response;
		const id = parseInt(req.params.id);
		try {
			response = await Item.delete(id);
			res.status(httpStatus.OK).json(JsonResponse(httpStatus.OK, 'item deleted well', response));
		} catch (err) {
			next(err);
		}
	},
	update: async (req: Request, res: Response, next: NextFunction) => {
		let response;
		let { body } = req;
		try {
			response = await Item.update(body);
			res.status(httpStatus.OK).json(JsonResponse(httpStatus.OK, 'item updated well', response));
		} catch (err) {
			next(err);
		}
	},
	getItemsById: async (req: Request, res: Response, next: NextFunction) => {
		let response;
		const uid = parseInt(req.params.uid);
		const date = req.params.date;
		try {
			response = await Item.getItemsById(uid, date);
			res.status(httpStatus.OK).json(JsonResponse(httpStatus.OK, 'items get well', response));
		} catch (err) {
			next(err);
		}
	},
};

export default ItemController;
