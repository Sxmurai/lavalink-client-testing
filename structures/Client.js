const { Client } = require("discord.js");
const CommandHandler = require("./CommandHandler");
const EventHandler = require("./EventHandler");
const { ErelaClient } = require("erela.js");

module.exports = class MusicBotClient extends Client {
	constructor(data = {}) {
		super({ disableMentions: "everyone" });

		this.commands = new CommandHandler(this);
		this.events = new EventHandler(this);
		this.erela = new ErelaClient(this, require("../config").nodes, {
			shardCount: this.shard ? this.shard.count : 0,
			userId: "703751675411824691"
		});

		Object.keys(data).forEach(k => Object.defineProperty(this, k, { value: data[k] }));
	}

	async start() {
		this.commands.loadAll();
		this.events.loadAll();
		/* Other shit for lavalink and whatever */

		this.erela.on("trackEnd", async (player) => {
            await this.client.erela.players.destroy(player.guild.id);
            await player.voiceChannel.leave();

            return player.textChannel.send(`The current track is over, I will be leaving now. :wave:`);
        });

		return this.login(this.token);
	}
} 