const { CommandHandler } = require("../structures");

module.exports = class Command {
	constructor(client, options = {}) {
		const {
			name,
			category,
		} = options;

		this.client = client;
		this.handler = CommandHandler;
	}

	execute() {
		throw new Error(`${this.constructor.name}#execute has not ben implemented.`);
	}
}