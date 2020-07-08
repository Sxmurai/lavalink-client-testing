const { Command } = require("../base");

const { Rest } = require("lavacord");
const fetch = require("node-fetch");
const { URLSearchParams } = require("url");

const types = ["youtube", "soundcloud"]

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

        let player = this.client.manager.players.get(message.guild.id);
        if (player) return message.reply(`I am already playing a song!`);

        if (!args[0]) return message.reply(`please provide a song to play.`);
        const track = await Rest.load(this.client.manager.idealNodes[0], `ytsearch:${args.join(" ")}`);
        if (!track.tracks.length) return message.reply(`no results found for: \`${args.join(" ")}\``);
        
        if (!player) player = await this.client.manager.join({
            guild: message.guild.id,
            channel: channel.id,
            node: "Main"
        }, { selfdeaf: true });

        await player.play(track.tracks[0].track);

        message.channel.send(`Now playing: ${track.tracks[0].info.title}`);

        player.on("end", async () => {
            await this.client.manager.leave(message.guild.id);

            return message.channel.send(`The currently playing song is over. I will be leaving now. :wave:`);
        });
    }
}