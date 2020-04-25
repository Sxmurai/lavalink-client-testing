const { Event } = require("../base");

module.exports = class MessageEvent extends Event {
	constructor(client) {
		super(client, {
			name: "message",
			emitter: "client"
		});
	}

	async execute(message) {
		if (
			message.author.bot
			|| message.channel.type !== "test"
			|| !message.content.startsWith(this.client.options.prefix)
		) return;

		const [cmd, ...args] = message.content.slice(1).split(/ +/g);
		const command = this.findCommand(cmd);
		if (!command) return;

		try {
			command.execute(message, args);
		} catch (error) {
			console.error(command.name, error); 
		}
	}

	findCommand(id) {
		return this.client.commands.modules.find((c) => c.name === id);
	}
}