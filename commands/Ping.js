const { Command } = require("../base");

module.exports = class PingCommand extends Command {
	constructor(client) {
		super(client, {
			name: "ping",
			category: "Information",
			description: "Displays the bot's latency"
		});
	}
	execute(message) {
		return message.reply(`pong! \`${this.client.ws.ping}MS\``)
	}
}
