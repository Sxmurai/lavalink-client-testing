const { Command } = require("../base");

module.exports = class ResumeCommand extends Command {
    constructor(client) {
        super(client, {
            name: "resume",
            category: "Music",
            description: "Resumes the track"
        });
    }

    async execute(message) {
        const player = this.client.music.getPlayer(message.guild.id)
        if (!player) return message.reply(`there is no song currently playing in the guild.`);

        if (!player.paused) return message.reply(`the current track isn't even paused`);

        await player.pause(false);

        return message.reply(`resumed the current track.`);
    }
}