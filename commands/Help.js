const { Command } = require("../base");

module.exports = class HelpCommand extends Command {
    constructor(client) {
        super(client, {
            name: "help",
            category: "Information",
            description: "Displays all of the commands or a selected command"
        });
    }

    execute(message, args) {
        if (!args[0]) {
            let categories = [...new Set(this.client.commands.modules.map(cmd => cmd.category))],
                str = ``;

            for (const id of categories) {
                const category = this.client.commands.modules.filter(cmd => cmd.category === id);

                str += `> ${id}:\n${category.map(cmd => `  - ${cmd.name}`).join(",\n")}\n`
            }

            return message.channel.send(str, { code: "md" })
        }

        const cmd = this.client.commands.modules.find(id => id.name === args[0].toLowerCase())

        return message.channel.send(
            [
                `- Name: ${cmd.name}`,
                `- Category: ${cmd.category}`,
                `- Description: ${cmd.description}`
            ].join("\n"),
            { code: "md" }
        )
    }
}
