import db from '../config/db';
import { PaymentDTO } from '../../shared/dto';

// TODO: Response type

const Payment = {
	create: async (payment: PaymentDTO.CREATE) => {
		try {
			const result = await db.query(`INSERT INTO payment SET ?`, payment);
			const insertedId = result[0]['insertId'];
			return { id: insertedId, ...payment };
		} catch (err) {
			throw err;
		}
	},
	delete: async (id: PaymentDTO.DELETE) => {
		try {
			const result = await db.query(`UPDATE payment SET removed = '${1}' WHERE id = '${id}'`);
			return { id };
		} catch (err) {}
	},
	getPaymentsById: async (uid: PaymentDTO.GET) => {
		try {
			let paymentData = await db.query(
				`SELECT id, uid_payment, name FROM payment WHERE uid_payment = '${uid}' and removed = '${0}'`,
			);
			return paymentData[0];
		} catch (err) {
			throw err;
		}
	},
};

export default Payment;
