const { Command } = require("../base");

module.exports = class ResumeCommand extends Command {
	constructor(client) {
		super(client, {
			name: "resume",
			category: "Music",
			description: "Resumes music in a voice channel"
		});
	}

	async execute(message, args) {
		let player = this.client.manager.players.get(message.guild.id);

		if (!player) return message.reply(`i am already playing a song!`);
		if (!player.paused) return message.reply("the player isn't paused!");

		await player.resume(false);
		return message.reply("the player is now resumed");
  }
}
