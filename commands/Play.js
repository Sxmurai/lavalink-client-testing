const { Command } = require("../base");

module.exports = class PlayCommand extends Command {
    constructor(client) {
        super(client, {
            name: "play",
            category: "Music",
            description: "Plays music in a voice channel"
        });
    }

    async execute(message, args) {
        const { channel } = message.member.voice;

        if (!channel) return message.reply(`you must join a voice channel!`);

        const missingPermissions = channel.permissionsFor(message.guild.me).missing(["CONNECT", "SPEAK"]);
        if (missingPermissions.length) 
            return message.reply(`you must give me the: ${missingPermissions.map((permission) => `\`${permission}\``).join(", ")} permission${missingPermissions.length > 1 ? "s" : ""}`);

        let player = await this.client.shoukaku.getPlayer(message.guild.id)
        if (player) return message.reply(`there is already a song playing!`);

        if (!args[0]) return message.reply(`please provide a song to play`);

        const node = this.client.shoukaku.getNode();
        const track = await node.rest.resolve(args.join(" "), "youtube");

        if (!track.tracks.length) return message.reply(`nothing found for: \`${args.join(" ")}\``);

        if (!player) player = await node.joinVoiceChannel({
            guildID: message.guild.id,
            voiceChannelID: channel.id,
            deaf: true
        })

        if (!player.paused) await player.playTrack(track.tracks[0].track);

        message.channel.send(`Now playing: ${track.tracks[0].info.title}`);

        player.on("end", async () => {
            await player.disconnect();

            return message.channel.send(`The current song is over, I will be leaving now. :wave:`);
        });
    }
}