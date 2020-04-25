const { Client } = require("discord.js");
const CommandHandler = require("./CommandHandler");
const EventHandler = require("./EventHandler");

module.exports = class MusicBotClient extends Client {
	constructor(options = {}) {
		super({ disableMentions: "everyone" });

		this.commands = new CommandHandler(this);
		this.events = new EventHandler(this);

		const {
			prefix,
			owners,
			nodes = [],
			token
		} = options;
	}

	async start() {
		/* Other shit for lavalink and whatever */

		return this.login(this.options.token);
	}
} 