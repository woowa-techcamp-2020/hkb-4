import model from '../models';

class UserController {
	private model!: any;
	constructor() {
		this.model = model.UserModel;
	}
}

export default new UserController();
