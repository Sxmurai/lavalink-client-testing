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
        const nodeStats = this.client.music.getNode().stats

        return message.channel.send(
            [
                `> System`,
                `   - User Memory : ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB/S`,
                `   - User CPU    : ${(process.cpuUsage().user / 10000).toFixed(2)}%`,
                `> Lavaclient`,
                `   - Memory      : ${(nodeStats.memory.used / 10000000).toFixed(2)} MB/S`,
                `   - CPU         : ${(nodeStats.cpu.lavalinkLoad).toFixed(2)}%`,
                `   - Version     : ${require("../package.json").dependencies.lavaclient}`
            ].join("\n"),
            { code: "md" }
        )
    }
}