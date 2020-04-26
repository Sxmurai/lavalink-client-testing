const { Client } = require("discord.js");
const CommandHandler = require("./CommandHandler");
const EventHandler = require("./EventHandler");
const { Manager } = require("lavaclient");
const { RESTPlugin } = require("lavaclient-rest-plugin");

module.exports = class MusicBotClient extends Client {
	constructor(data = {}) {
		super({ disableMentions: "everyone" });

		this.commands = new CommandHandler(this);
		this.events = new EventHandler(this);

		Object.keys(data).forEach(k => Object.defineProperty(this, k, { value: data[k] }));

		this.music = new Manager(require("../config").nodes, {
			send: (guildId, packet) => {
				const guild = this.guilds.cache.get(guildId);
				if (guild) return guild.shard.send(packet);
				return;
			},
			shards: 1,
			plugins: [new RESTPlugin()]
		});
	}

	async start() {
		this.commands.loadAll();
		this.events.loadAll();
		/* Other shit for lavalink and whatever */

		this.ws.on("VOICE_SERVER_UPDATE", (pk) => this.music.serverUpdate(pk));
		this.ws.on("VOICE_STATE_UPDATE", (pk) => this.music.stateUpdate(pk));
		await this.music.init("703751675411824691");

		return this.login(this.token);
	}
} 