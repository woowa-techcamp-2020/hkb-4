interface JOIN {
	name: string;
	password: string;
	password2: string;
}

interface LOGIN {
	name: string;
	password: string;
}

type DELETE = number;
type GET = number;

export { JOIN, LOGIN, DELETE, GET };
