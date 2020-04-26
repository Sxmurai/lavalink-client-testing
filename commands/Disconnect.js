const { Command } = require("../base");

module.exports = class DisconnectCommand extends Command {
    constructor(client) {
        super(client, {
            name: "disconnect",
            category: "Music",
            description: "Disconnects a player, if there is one."
        });
    }

    async execute(message) {
        const player = this.client.music.getPlayer(message.guild.id);
        if (!player) return message.reply(`there is no currently playing song in the guild`);

        await player.leave();

        return message.reply(`successfully disconnected from the voice channel.`);
    }
}