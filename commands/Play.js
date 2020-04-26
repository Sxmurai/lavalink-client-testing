const { Command } = require("../base");

module.exports = class PlayCommand extends Command {
    constructor(client) {
        super(client, {
            name: "play",
            category: "Music",
            description: "Plays music the you select"
        });
    }

    async execute(message, args) {
        const { channel } = message.member.voice;

        if (!channel) return message.reply(`you must join a voice channel!`);

        const missingPermissions = channel.permissionsFor(message.guild.me).missing(["CONNECT", "SPEAK"]);
        if (missingPermissions.length) 
            return message.reply(`you must give me the: ${missingPermissions.map((permission) => `\`${permission}\``).join(", ")} permission${missingPermissions.length > 1 ? "s" : ""}`);

        const player = this.client.music.summonPlayer(message.guild.id);
        if (player.playing) return message.reply(`I am already playing a song!`);

        if (!args[0]) return message.reply(`please provide a song to play.`);

        const { rest } = this.client.music.getNode();

        const track = await rest.resolve(`ytsearch:${args.join(" ")}`);
        if (!track.tracks.length) return message.reply(`no results found for: \`${args.join(" ")}\``);

        await player.connect(channel.id, { deaf: true });

        player.play(track.tracks[0].track);

        message.channel.send(`Now playing: ${track.tracks[0].info.title}`);

        player.once("end", async () => {
            await player.leave();

            return message.channel.send(`The song is over. I will be going now. :wave:`)
        })
    }
}