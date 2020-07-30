import db from '../config/db';
import { UserDTO } from '../../shared/dto';

const UserModel = {
	findBy: async (name: string): Promise<UserDTO.RESPONSE_LOGIN> => {
		const data = await db.query(`SELECT * FROM user WHERE name='${name}'`);
		// @ts-ignore
		return data[0][0];
	},
	join: (name: string, password: string) => {
		db.query(`INSERT INTO user(name, password) VALUES ('${name}', '${password}')`);
	},
};

export default UserModel;
