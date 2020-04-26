const { Client } = require("discord.js");
const CommandHandler = require("./CommandHandler");
const EventHandler = require("./EventHandler");
const { Shoukaku } = require("shoukaku");

module.exports = class MusicBotClient extends Client {
	constructor(data = {}) {
		super({ disableMentions: "everyone" });

		this.commands = new CommandHandler(this);
		this.events = new EventHandler(this);

		this.shoukaku = new Shoukaku(this, require("../config").nodes, { 
			moveOnDisconnect: false, 
			resumable: false, 
			resumableTimeout: 30, 
			reconnectTries: 2, 
			restTimeout: 10000 
		})

		Object.keys(data).forEach(k => Object.defineProperty(this, k, { value: data[k] }));
	}

	async start() {
		this.commands.loadAll();
		this.events.loadAll();
		/* Other shit for lavalink and whatever */


		return this.login(this.token);
	}
} 