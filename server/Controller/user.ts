import { Request, Response, NextFunction } from 'express';
import { UserModel } from '../model';
import httpStatus from 'http-status';
import { JsonResponse } from '../module/util';

const UserController = {
	join: async (req: Request, res: Response) => {
		const {
			body: { name, password, password2 },
		} = req;
		if (password !== password2) {
			res
				.status(httpStatus.NOT_ACCEPTABLE)
				.json(JsonResponse(httpStatus.NOT_ACCEPTABLE, 'password confirmation failed', {}));
		}

		try {
			const user = await UserModel.findByUsername(name);

			if (user) {
				res
					.status(httpStatus.NOT_ACCEPTABLE)
					.json(JsonResponse(httpStatus.NOT_ACCEPTABLE, 'existing username', {}));
				return;
			}

			await UserModel.join(name, password);

			res.status(httpStatus.OK).json(JsonResponse(httpStatus.OK, 'Successfully joined', {}));
		} catch (err) {
			res
				.status(httpStatus.INTERNAL_SERVER_ERROR)
				.json(JsonResponse(httpStatus.INTERNAL_SERVER_ERROR, 'server error', {}));
		}
	},
	postLogin: (req: Request, res: Response, next: NextFunction) => {
		if (req.isAuthenticated()) {
			res
				.status(httpStatus.OK)
				.json(JsonResponse(httpStatus.OK, 'Successfully logged in', req.user));
		} else {
			res
				.status(httpStatus.UNAUTHORIZED)
				.json(JsonResponse(httpStatus.UNAUTHORIZED, 'log in failed', {}));
		}
	},
	logout: (req: Request, res: Response) => {
		req.logout();
		res.status(httpStatus.OK).json(JsonResponse(httpStatus.OK, 'logged out', {}));
	},
	getUser: (req: Request, res: Response) => {
		if (req.isAuthenticated()) {
			res.status(httpStatus.OK).json(JsonResponse(httpStatus.OK, 'Logged in user exist', req.user));
		} else {
			res
				.status(httpStatus.OK)
				.json(JsonResponse(httpStatus.OK, "Logged in user doesn't exist", {}));
		}
	},
};

export default UserController;
