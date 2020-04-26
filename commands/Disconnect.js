const { Command } = require("../base");

module.exports = class DisconnectCommand extends Command {
    constructor(client) {
        super(client, {
            name: "disconnect",
            category: "Music",
            description: "Destroys the current player"
        });
    }

    async execute(message) {
        const player = this.client.shoukaku.getPlayer(message.guild.id);
        if (!player) return message.reply(`there is no song currently playing`)

        await player.disconnect();

        return message.reply(`detroyed the current player`);
    }
}