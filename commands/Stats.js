const { Command } = require("../base");

module.exports = class StatsCommand extends Command {
    constructor(client) {
        super(client, {
            name: "stats",
            category: "Information"
        });
    }

    execute(message) {
        return message.channel.send(
            [
                `Memory : ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB/S`,
                `CPU    : ${(process.cpuUsage().user / 1024 / 1024).toFixed(2)}%`
            ].join("\n"),
            { code: "js" }
        )
    }
}
