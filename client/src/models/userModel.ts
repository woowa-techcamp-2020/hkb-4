import { UserApi } from '../api';
import { UserDTO } from '../../../shared/dto';
import observer from '../models/observer';

class UserModel {
	private user!: object;
	private observer!: any;
	constructor() {
		this.user = {};
		this.observer = observer;
	}

	async checkUser() {
		const result = await UserApi.getUser();
		this.user = result;
		this.observer.notify('userChanged', this.user);
	}
}

export default new UserModel();
