import { UserApi } from '../api';
import { UserDTO } from '../../../shared/dto';
import observer from '../models/observer';

class UserModel {
	private user!: UserDTO.RESPONSE_LOGIN | {};
	private observer!: any;
	constructor() {
		this.user = {};
		this.observer = observer;
	}

	setUser(user: UserDTO.RESPONSE_LOGIN) {
		this.user = user;
		this.observer.notify('userChanged', this.user);
	}

	async checkUser() {
		const user = await UserApi.getUser();
		this.setUser(user);
	}

	async fetchLogin(userData) {
		try {
			const user = await UserApi.login(userData);
			this.setUser(user);
			return { status: true };
		} catch (err) {
			return { status: false };
		}
	}

	async fetchLogout() {
		const user = await UserApi.logout();
		this.setUser(user);
	}
}

export default new UserModel();
