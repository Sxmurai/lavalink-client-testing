const { Command } = require("../base");

module.exports = class DisconnectCommand extends Command {
    constructor(client) {
        super(client, {
            name: "disconnect",
            category: "Music",
            description: "Distroys the player"
        });
    }

    async execute(message) {
        const player = this.client.erela.players.get(message.guild.id);
        if (!player) return message.reply(`there is no player`);

        await player.voiceChannel.leave()
        await this.client.erela.players.destroy(message.guild.id);

        return message.reply(`disconnected the player successfully`)
    }
}