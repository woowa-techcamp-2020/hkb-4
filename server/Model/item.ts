import db from '../db';
import { ItemDTO } from '../../shared/dto';

const ItemModel = {
	create: async (item: ItemDTO.CREATE) => {
		try {
			const result = await db.query(`INSERT INTO topic SET ?`, item);
			console.log('item create', result);
			return result;
		} catch (err) {
			throw err;
		}
	},
	update: async (item: ItemDTO.UPDATE) => {
		try {
			const result = await db.query(`UPDATE card SET ? WHERE id = '${item.id}'`, item);
			console.log('item create', result);
			return result;
		} catch (err) {
			throw err;
		}
	},
	delete: async (uid: number) => {
		try {
			const result = await db.query(`UPDATE item SET removed = '${1}' WHERE uid_item = '${uid}'`);
			console.log('payment delete', result);
			return result;
		} catch (err) {}
	},
	getItemsById: async (uid: number) => {
		try {
			let itemData = await db.query(
				`SELECT id, uid_item, pid_item, type, category, amount, description, date FROM item WHERE uid_item = '${uid}' and removed = '${0}'`,
			);
			console.log('item get', itemData);
			return itemData;
		} catch (err) {
			throw err;
		}
	},
};

export default ItemModel;
