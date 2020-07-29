import { url, Options } from './util';
import { PaymentDTO } from '../../../shared/dto';
class PaymentApi {
	static async create(body: PaymentDTO.CREATE) {
		try {
			const result = await fetch(`${url}/payment/create`, Options.POST(body));
			return result;
		} catch (error) {
			throw error;
		}
	}

	static async getItemsById(uid: PaymentDTO.GET) {
		try {
			const result = await fetch(`${url}/payment/:${uid}`, Options.GET());
			return result;
		} catch (error) {
			throw error;
		}
	}

	static async delete(uid: PaymentDTO.DELETE) {
		try {
			const result = await fetch(`${url}/payment/delete/:${uid}`, Options.PATCH({}));
			return result;
		} catch (error) {
			throw error;
		}
	}
}

export default PaymentApi;
