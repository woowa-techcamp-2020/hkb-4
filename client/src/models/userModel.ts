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
		this.user = user;
		this.observer.notify('userChanged', this.user);
	}

	async checkUser() {
		const { user } = await UserApi.getUser();
		console.log(user);
		this.setUser(user);
	}

	async fetchLogin(user) {
		const result = await UserApi.login(user);
		this.setUser(result);
	}
}

export default new UserModel();
