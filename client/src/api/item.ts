import { url, Options } from './util';
import { ItemDTO } from '../../../shared/dto';
class ItemApi {
	static async create(body: ItemDTO.CREATE) {
		try {
			const result = await fetch(`${url}/item/create`, Options.POST(body));
			return result;
		} catch (error) {
			throw error;
		}
	}

	static async update(body: ItemDTO.UPDATE) {
		try {
			const result = await fetch(`${url}/item/update`, Options.PATCH(body));
			return result;
		} catch (error) {
			throw error;
		}
	}

	static async getItemsById(uid: ItemDTO.GET) {
		try {
			const result = await fetch(`${url}/item/:${uid}`, Options.GET());
			return result;
		} catch (error) {
			throw error;
		}
	}

	static async delete(uid: ItemDTO.DELETE) {
		try {
			const result = await fetch(`${url}/item/delete/:${uid}`, Options.PATCH({}));
			return result;
		} catch (error) {
			throw error;
		}
	}
}

export default ItemApi;
