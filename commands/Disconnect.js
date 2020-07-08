const { Command } = require("../base");

module.exports = class DisconnectCommand extends Command {
    constructor(client) {
        super(client, {
            name: "disconnect",
            category: "Music",
            description: "Disconnects the player"
        });
    }

    async execute(message) {
        const player = this.client.manager.players.get(message.guild.id);
        if (!player) return message.reply(`there is no song playing in the current guild`);

        await this.client.manager.leave(message.guild.id);

        return message.reply(`successfully disconnected from the voice channel.`);
    }
}