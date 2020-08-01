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
}

export default new UserModel();
