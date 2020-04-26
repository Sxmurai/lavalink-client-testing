const { Command } = require("../base");

module.exports = class PauseCommand extends Command {
    constructor(client) {
        super(client, {
            name: "pause",
            category: "Music",
            description: "Pauses the currently playing track"
        });
    }

    async execute(message) {
        const player = this.client.shoukaku.getPlayer(message.guild.id);
        if (!player) return message.reply(`there is no song currently playing`)

        if (player.paused) return message.reply(`the current song is already paused`);

        await player.setPaused(true);

        return message.reply(`paused the track`)
    }
}