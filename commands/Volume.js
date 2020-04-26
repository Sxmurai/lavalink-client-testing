const { Command } = require("../base");

module.exports = class VolumeCommand extends Command {
    constructor(client) {
        super(client, {
            name: "volume",
            category: "Music",
            description: "Changes the volume of the player"
        });
    }

    async execute(message, args) {
        const player = this.client.manager.players.get(message.guild.id);
        if (!player) return message.reply(`there is no song playing in the current guild`);

        if (!args[0] || args[0] < 1 || args[0] > 100 || isNaN(args[0]))
            return message.reply(`please provide a valid number between \`1-100\``);

        player.volume(args[0]);

        return message.channel.send(`Set the volume to: \`${args[0]}\``);
    }
}