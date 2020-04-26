const { Command } = require("../base");

module.exports = class PauseCommand extends Command {
    constructor(client) {
        super(client, {
            name: "pause",
            category: "Music",
            description: "Pauses the current track"
        });
    }

    async execute(message) {
        const player = this.client.erela.players.get(message.guild.id);
        if (!player) return message.reply(`there is no currently playing track`);

        if (!player.playing) return message.reply(`the current track is already paused`);

        await player.pause(true);

        return message.reply(`paused the current track`)
    }
}