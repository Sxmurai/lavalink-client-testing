const { join } = require("path");
const { readdirSync } = require("fs");

module.exports = class CommandHandler {
	constructor(client) {
		this.client = client;
		this.modules = [];
		this.emitters = { client }
		this.loadAll();
	}

	loadAll() {
		for (const file of readdirSync("./commands")) {
			const command = new (require(join("../commands/", file)))(this.client);
			this.modules.push(command);
		}
	}
}