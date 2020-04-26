const { CommandHandler } = require("../structures");

module.exports = class Command {
	constructor(client, options = {}) {
		const {
			name,
			category,
		} = options;

		this.name = name;
		this.category = category

		this.client = client;
		this.handler = client.commands;
	}

	execute() {
		throw new Error(`${this.constructor.name}#execute has not ben implemented.`);
	}
}