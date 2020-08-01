import model from '../models';

class UserController {
	private model!: any;
	constructor() {
		this.model = model.UserModel;
	}

	initUser() {
		this.model.checkUser();
	}
}

export default new UserController();
