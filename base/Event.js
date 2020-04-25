const { EventHandler } = reuqire("../structures");

module.exports = class Event {
	constructor(client, options = {}) {
		const {
			name,
			once = false,
			emitter = "client"
		} = options;

		this.client = client;
		this.handler = EventHandler
	}

	execute() {
		throw new Error(`${this.contructor.name}#execute has not been implemented`);
	}
}