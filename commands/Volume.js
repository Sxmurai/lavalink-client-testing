const { Command } = require("../base");

module.exports = class VolumeCommand extends Command {
    constructor(client) {
        super(client, {
            name: "volume",
            category: "Music",
            description: "Adjusts the volume of the player"
        });
    }

    execute(message, args) {
        const player = this.client.music.getPlayer(message.guild.id);
        if (!player) return message.reply(`there is no currently playing song in the guild`);

        if (!args[0] || args[0] < 1 || args[0] > 100 || isNaN(args[0])) 
            return message.reply(`please provide a number between \`1-100\``);

        player.setVolume(args[0]);

        return message.reply(`changed the volume from: \`${player.volume}\` to \`${args[0]}\``);
    }
}
