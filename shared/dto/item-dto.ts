enum ItemType {
	INCOME,
	SPENDING,
}

type INCOME = '월급' | '용돈' | '기타 수입';
type SPENDING = '식비' | '생활' | '쇼핑/뷰티' | '교통' | '의료/건강' | '문화/여가' | '미분류';

interface CREATE {
	uid_item: number;
	pid_item: string;
	type: ItemType;
	category: INCOME | SPENDING;
	amount: number;
	date: string;
	description: string;
}

interface UPDATE {
	id: number;
	pid_item: string;
	type: ItemType;
	category: INCOME | SPENDING;
	amount: number;
	description: string;
}

type DELETE = number;
type GET = number;

export { CREATE, UPDATE, DELETE, GET, ItemType, INCOME, SPENDING };
