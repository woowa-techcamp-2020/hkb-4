interface JOIN {
	name: string;
	password: string;
	password2: string;
}

interface LOGIN {
	name: string;
	password: string;
}

interface RESPONSE_LOGIN {
	name: string;
	password: string;
	id: number;
	removed: number;
}

type DELETE = number;
type GET = number;

export { JOIN, LOGIN, DELETE, GET, RESPONSE_LOGIN };
