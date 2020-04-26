const { join } = require("path");
const { readdirSync } = require("fs");

module.exports = class EventHandler {
	constructor(client) {
		this.client = client;
		this.modules = [];
		this.emitters = { client }
	}

	loadAll() {
		for (const file of readdirSync("./events")) {
			const event = new (require(join("../events/", file)))(this.client)
			this.modules.push(event);
			this.emitters[event.emitter][event.once ? "once" : "on"](event.name, event.execute.bind(event));
		}
	}
}