const { Event } = require("../base");

module.exports = class ReadyEvent extends Event {
	constructor(client) {
		super(client, {
			name: "ready",
			emitter: "client"
		});
	}

	execute() {
		console.log("Ready!")
	}
} 