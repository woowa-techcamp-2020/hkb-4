import { url, Options } from './util';
import { PaymentDTO } from '../../../shared/dto';
class PaymentApi {
	static async create(body: PaymentDTO.CREATE) {
		try {
			const response = await fetch(`${url}/payment/create`, Options.POST(body));
			const json = await response.json();
			return json.result;
		} catch (error) {
			throw error;
		}
	}

	static async getPayments() {
		try {
			const response = await fetch(`${url}/payment`, {
				...Options.GET(),
				credentials: 'include',
			});
			const json = await response.json();
			return json.result;
		} catch (error) {
			throw error;
		}
	}

	static async delete(uid: PaymentDTO.DELETE) {
		try {
			const response = await fetch(`${url}/payment/delete/${uid}`, Options.PATCH({}));
			const json = await response.json();
			return json.result;
		} catch (error) {
			throw error;
		}
	}
}

export default PaymentApi;
