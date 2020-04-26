const { Command } = require("../base");

module.exports = class PauseCommand extends Command {
	constructor(client) {
		super(client, {
			name: "pause",
			category: "Music",
			description: "Pauses music in a voice channel"
		});
	}

	async execute(message, args) {
		let player = this.client.manager.players.get(message.guild.id);

		if (!player) return message.reply(`I am already playing a song!`);
		if (player.paused) return message.reply("the player is already paused!");

		await player.pause(true);
		return message.reply("the player is now paused");
	}
}
