class Observer {
	private list!: {
		[key: string]: Array<{
			// TODO: type바꾸기
			context: any;
			func: Function;
		}>;
	};

	constructor() {
		this.list = {};
	}

	subscribe(name: string, context: any, func: Function) {
		if (!this.list[name]) {
			this.list[name] = [];
		}
		this.list[name].push({
			context,
			func,
		});
		console.log(`somebody subscribed for '${name}' event`);
		console.log(this.list);
	}

	unsubscribe(name: string, context: any, func: Function) {
		if (!this.list[name]) return;
		const index = this.list[name].findIndex(ele => ele.context === context && ele.func === func);
		if (index === -1) return;
		this.list[name].splice(index, 1);
	}

	// TODO
	notify(name: string, data?: any) {
		console.log(`observer is notifying for '${name}' evnet`);
		if (!this.list[name]) return;
		this.list[name].forEach(ele => ele.func(data));
	}
}

export default new Observer();
