import { Request, Response } from 'express';
import UserModel from '../model/user';

const UserController = {
	join: async (req: Request, res: Response) => {
		const {
			body: { username: name, password, password2 },
		} = req;
		if (password !== password2) {
			res.send({ status: 'failure', message: '비밀번호가 다릅니다.' });
		}

		try {
			const user = await UserModel.findBy(name);

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
};

export default UserController;
