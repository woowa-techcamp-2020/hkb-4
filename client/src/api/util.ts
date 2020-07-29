export class Options {
	constructor() {}
	static GET() {
		return {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		};
	}
	static POST(body: JSON | any) {
		return {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body,
		};
	}
	static PATCH(body: JSON | any) {
		return {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body,
		};
	}
	static PUT(body: JSON | any) {
		return {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body,
		};
	}
}

// @ts-ignore
export const url = '127.0.0.1:3000';
