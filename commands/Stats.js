const { Command } = require("../base");

module.exports = class StatsCommand extends Command {
    constructor(client) {
        super(client, {
            name: "stats",
            category: "Information",
            description: "Displays the bot's stats"
        });
    }

    execute(message) {
        return message.channel.send(
            [
                `> System`,
                `   - User Memory : ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB/S`,
                `   - User CPU    : ${(process.cpuUsage().user / 10000).toFixed(2)}%`,
                `> Shoukaku`,
                `   - Version     : ${require("shoukaku").version}`
            ].join("\n"),
            { code: "md" }
        )
    }
}
