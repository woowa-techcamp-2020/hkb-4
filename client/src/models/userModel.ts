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

	setUser(user) {
		if (user !== this.user) {
			this.user = user;
			this.observer.notify('userChanged', this.user);
		}
	}

	async checkUser() {
		const result = await UserApi.getUser();
		this.setUser(result);
	}

	async fetchLogin(user) {
		const result = await UserApi.login(user);
		this.setUser(result);
	}
}

export default new UserModel();
