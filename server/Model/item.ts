import db from '../config/db';
import { ItemDTO } from '../../shared/dto';

const ItemModel = {
	create: async (item: ItemDTO.CREATE) => {
		try {
			const result = await db.query(`INSERT INTO item SET ?`, item);
			//@ts-ignore
			const insertedId = result[0]['insertId'];
			return { ...item, id: insertedId };
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
	getItemsByDate: async (uid: number, date: string) => {
		try {
			let itemData = await db.query(`
				SELECT i.id as id, i.type as type, i.category as category, 
					i.amount as amount, i.description as description, date_format(i.date, "%Y-%m-%d") as date, p.id as pid, p.name as payment
				FROM item i
				JOIN payment p
					ON i.pid_item = p.id
				WHERE i.uid_item = '${uid}' and i.removed = '${0}' and date_format(i.date, '%Y-%m') = '${date}'
				ORDER BY id DESC
				`);
			return itemData[0];
		} catch (err) {
			throw err;
		}
	},
};

export default ItemModel;
