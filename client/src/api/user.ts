import { url, Options } from './util';
import { UserDTO } from '../../../shared/dto';
class UserApi {
	static async join(body: UserDTO.JOIN) {
		try {
			const response = await fetch(`${url}/join`, Options.POST(body));
			const json = await response.json();
			return json.result;
		} catch (error) {
			throw error;
		}
	}

	static async login(body: UserDTO.LOGIN) {
		try {
			const response = await fetch(`${url}/login`, {
				...Options.POST(body),
				credentials: 'include',
			});
			const json = await response.json();
			return json.result;
		} catch (error) {
			throw error;
		}
	}

	static async logout() {
		try {
			const response = await fetch(`${url}/logout`, {
				...Options.GET(),
				credentials: 'include',
			});
			const json = await response.json();
			return json.result;
		} catch (error) {
			throw error;
		}
	}

	static async getUser() {
		try {
			const response = await fetch(`${url}/getUser`, { ...Options.GET(), credentials: 'include' });
			const json = await response.json();
			return json.result;
		} catch (error) {
			throw error;
		}
	}
}

export default UserApi;
