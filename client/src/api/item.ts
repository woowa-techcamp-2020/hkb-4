import { url, Options } from './util';
import { ItemDTO } from '../../../shared/dto';
class ItemApi {
	static async create(body: ItemDTO.CREATE) {
		try {
			const response = await fetch(`${url}/item/create`, {
				...Options.POST(body),
				credentials: 'include',
			});
			const json = await response.json();
			return json.result;
		} catch (error) {
			throw error;
		}
	}

	static async update(body: ItemDTO.UPDATE) {
		try {
			const response = await fetch(`${url}/item/update`, Options.PATCH(body));
			const json = await response.json();
			return json.result;
		} catch (error) {
			throw error;
		}
	}

	static async getItemsByDate(date: string) {
		try {
			const response = await fetch(`${url}/item/${date}`, {
				...Options.GET(),
				credentials: 'include',
			});
			const json = await response.json();
			return json.result;
		} catch (error) {
			throw error;
		}
	}

	static async delete(uid: ItemDTO.DELETE) {
		try {
			const response = await fetch(`${url}/item/delete/${uid}`, Options.PATCH({}));
			const json = await response.json();
			return json.result;
		} catch (error) {
			throw error;
		}
	}
}

export default ItemApi;
