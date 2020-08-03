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

	setUser(user: any) {
		this.user = user;
		this.observer.notify('userChanged', this.user);
	}

	async checkUser() {
		const user = await UserApi.getUser();
		this.setUser(user);
	}

	async fetchLogin(userData) {
		const user = await UserApi.login(userData);
		this.setUser(user);
	}

	async fetchLogout() {
		const user = await UserApi.logout();
		this.setUser(user);
	}
}

export default new UserModel();
