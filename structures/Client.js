const { Client } = require("discord.js");
const CommandHandler = require("./CommandHandler");
const EventHandler = require("./EventHandler");
const { Manager } = require("@lavacord/discord.js");

module.exports = class MusicBotClient extends Client {
	constructor(data = {}) {
		super({ disableMentions: "everyone" });

		this.commands = new CommandHandler(this);
		this.events = new EventHandler(this);
		this.manager = new Manager(this, require("../config").nodes, {
			user: "703751675411824691",
			shards: this.shard ? this.shard.count : 0
		});

		Object.keys(data).forEach(k => Object.defineProperty(this, k, { value: data[k] }));
	}

	async start() {
		this.commands.loadAll();
		this.events.loadAll();
		/* Other shit for lavalink and whatever */

		await this.manager.connect();

		return this.login(this.token);
	}
} 