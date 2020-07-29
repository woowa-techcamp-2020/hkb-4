import db from '../db';
import { RowDataPacket } from 'mysql2';

const UserModel = {
	findBy: async (name: string) => {
		//TODO
		// @ts-ignore
		const [rows] = await db.query(`SELECT * FROM user WHERE name='${name}'`);
		// @ts-ignore
		return rows[0];
	},
	join: (name: string, password: string) => {
		db.query(`INSERT INTO user(name, password) VALUES ('${name}', '${password}')`);
	},
};

export default UserModel;
