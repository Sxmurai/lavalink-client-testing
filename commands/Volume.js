const { Command } = require("../base");

module.exports = class VolumeCommand extends Command {
    constructor(client) {
        super(client, {
            name: "volume",
            category: "Music",
            description: "Changes the players volume."
        });
    }

    execute(message, args) {
        const player = this.client.erela.players.get(message.guild.id);
        if (!player) return message.reply(`this is no player currently running in the guild`);

        if (!args[0] || args[0] < 1 || args[0] > 100 || isNaN(args[0])) 
            return message.reply(`please provide a number through \`1-100\``);

        player.setVolume(args[0]);

        return message.reply(`changed the volume from: \`${player.volume}\` to \`${args[0]}\``);
    }
}