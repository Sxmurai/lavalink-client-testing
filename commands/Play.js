const { Command } = require("../base");

module.exports = class PlayCommand extends Command {
    constructor(client) {
        super(client, {
            name: "play",
            category: "Music",
            description: "Plays a song in the queue"
        });
    }

    async execute(message, args) {
        const { channel } = message.member.voice;

        if (!channel) return message.reply(`you must join a voice channel!`);

        const missingPermissions = channel.permissionsFor(message.guild.me).missing(["CONNECT", "SPEAK"]);
        if (missingPermissions.length) 
            return message.reply(`you must give me the: ${missingPermissions.map((permission) => `\`${permission}\``).join(", ")} permission${missingPermissions.length > 1 ? "s" : ""}`);

        let player = this.client.erela.players.get(message.guild.id) || {};

        if (player.playing) return message.reply(`there is already a song being played!`);

        if (!args[0]) return message.reply(`please supply a song to play`);

        const track = await this.client.erela.search(args.join(" "), message.author);
        if (!track.tracks.length) return message.reply(`nothing was found with the query of: \`${args.join(" ")}\``);

        if (!player.playing) player = this.client.erela.players.spawn({
            guild: message.guild.id,
            textChannel: message.channel,
            voiceChannel: channel,
            selfDeaf: true
        });

        await player.queue.add(track.tracks[0])

        await player.play(track.tracks[0])

        message.channel.send(`Now playing: \`${track.tracks[0].title}\``);
    }
}