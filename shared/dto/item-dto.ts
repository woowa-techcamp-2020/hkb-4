interface CREATE {
	uid_item: number;
	pid_item: string;
	type: number;
	category: string;
	amount: number;
	description: string;
}

interface UPDATE {
	pid_item: string;
	type: number;
	category: string;
	amount: number;
	description: string;
}

export { CREATE, UPDATE };
