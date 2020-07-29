import { url, Options } from './util';
import { UserDTO } from '../../../shared/dto';
class UserApi {
	static async join(body: UserDTO.JOIN) {
		try {
			const result = await fetch(`${url}/join`, Options.POST(body));
			const json = await result.json();
			return json;
		} catch (error) {
			throw error;
		}
	}

	static async login(body: UserDTO.LOGIN) {
		try {
			const result = await fetch(`${url}/login`, Options.POST(body));
			const json = await result.json();
			return json;
		} catch (error) {
			throw error;
		}
	}
}

export default UserApi;
