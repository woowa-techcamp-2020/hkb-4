import db from '../db';
import { PaymentDTO } from '../../shared/dto';

// TODO: Response type

const Payment = {
	create: async (payment: PaymentDTO.CREATE) => {
		try {
			const result = await db.query(`INSERT INTO payment SET ?`, payment);
			console.log('payment create', result);
			return result;
		} catch (err) {
			console.log('err', err);
			throw err;
		}
	},
	delete: async (uid: number) => {
		try {
			const result = await db.query(
				`UPDATE payment SET removed = '${1}' WHERE uid_payment = '${uid}'`,
			);
			console.log('payment delete', result);
			return { uid };
		} catch (err) {}
	},
	getPaymentsById: async (uid: number) => {
		try {
			let paymentData = await db.query(
				`SELECT id, uid_payment, name FROM payment WHERE uid_payment = '${uid}' and removed = '${0}'`,
			);
			console.log('paymet get', paymentData);
			return paymentData;
		} catch (err) {
			throw err;
		}
	},
};

export default Payment;
