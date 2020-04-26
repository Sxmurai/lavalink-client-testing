const { Command } = require("../base");

module.exports = class ResumeCommand extends Command {
    constructor(client) {
        super(client, {
            name: "resume",
            category: "Music",
            description: "Resumes the current track"
        });
    }

    async execute(message) {
        const player = this.client.erela.players.get(message.guild.id);
        if (!player) return message.reply(`there is no currently playing track`);

        if (player.playing) return message.reply(`the current track isn't even already paused`);

        await player.pause(false);

        return message.reply(`resumed the current track`)
    }
}