const { EventHandler } = require("../structures");

module.exports = class Event {
	constructor(client, options = {}) {
		const {
			name,
			once = false,
			emitter = "client"
		} = options;

		this.name = name;
		this.once = once;
		this.emitter = emitter;

		this.client = client;
		this.handler = client.events
	}

	execute() {
		throw new Error(`${this.contructor.name}#execute has not been implemented`);
	}
}