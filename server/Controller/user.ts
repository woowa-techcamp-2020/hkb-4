import { Request, Response, NextFunction } from 'express';
import { UserModel } from '../model';
import httpStatus from 'http-status';
import { JsonResponse } from '../module/util';
import { nextTick } from 'process';

const UserController = {
	join: async (req: Request, res: Response) => {
		const {
			body: { username: name, password, password2 },
		} = req;
		if (password !== password2) {
			res.send({ status: 'failure', message: '비밀번호가 다릅니다.' });
		}

		try {
			const user = await UserModel.findByUsername(name);

			if (user) {
				res.send({ status: 'failure', message: '해당 유저가 이미 존재합니다.' });
				return;
			}

			await UserModel.join(name, password);
			res.send({ status: 'success', message: '가입되었습니다.' });
		} catch (err) {
			res.send({ status: 'failure', message: '서버 에러가 발생했습니다.' });
		}
	},
	postLogin: (req: Request, res: Response, next: NextFunction) => {
		if (req.isAuthenticated()) {
			res
				.status(httpStatus.OK)
				.json(JsonResponse(httpStatus.OK, 'Successfully logged in', req.user));
		}
		// TODO : 로그인 실패 핸들링
	},
};

export default UserController;
