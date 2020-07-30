import db from '../db';
import { ItemDTO } from '../../shared/dto';

const ItemModel = {
	create: async (item: ItemDTO.CREATE) => {
		try {
			const result = await db.query(`INSERT INTO item SET ?`, item);
			return item;
		} catch (err) {
			throw err;
		}
	},
	update: async (item: ItemDTO.UPDATE) => {
		try {
			const result = await db.query(
				`UPDATE item SET ? WHERE id = '${item.id}' and removed = '${0}'`,
				item,
			);
			return item;
		} catch (err) {
			throw err;
		}
	},
	delete: async (id: number) => {
		try {
			const result = await db.query(`UPDATE item SET removed = '${1}' WHERE id = '${id}'`);
			return { id };
		} catch (err) {}
	},
	getItemsById: async (uid: number, date: string) => {
		try {
			let itemData = await db.query(
				`SELECT id, uid_item, pid_item, type, category, amount, description, date FROM item WHERE uid_item = '${uid}' and removed = '${0}' and date_format(now(), '%Y-%m') = '${date}'`,
			);
			return itemData[0];
		} catch (err) {
			throw err;
		}
	},
};

export default ItemModel;
