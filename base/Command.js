const { CommandHandler } = require("../structures");

module.exports = class Command {
	constructor(client, options = {}) {
		const {
			name,
			category,
			description
		} = options;

		this.name = name;
		this.category = category;
		this.description = description;

		this.client = client;
		this.handler = client.commands;
	}

	execute() {
		throw new Error(`${this.constructor.name}#execute has not ben implemented.`);
	}
}
