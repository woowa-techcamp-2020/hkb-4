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
			body: JSON.stringify(body),
		};
	}
	static PATCH(body: JSON | any) {
		return {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		};
	}
	static PUT(body: JSON | any) {
		return {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		};
	}
}

// @ts-ignore
export const url = 'http://localhost:3000';
