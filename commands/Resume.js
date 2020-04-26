const { Command } = require("../base");

module.exports = class ResumeCommand extends Command {
    constructor(client) {
        super(client, {
            name: "resume",
            category: "Music",
            description: "Resumes the currently playing track"
        });
    }

    async execute(message) {
        const player = this.client.shoukaku.getPlayer(message.guild.id);
        if (!player) return message.reply(`there is no song currently playing`)

        if (!player.paused) return message.reply(`the current song isn't even already paused`);

        await player.setPaused(false);

        return message.reply(`resumed the track`)
    }
}