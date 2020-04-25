const { Client, CommandHandler, EventHandler } = require("./structures");
const { prefix, owners, nodes, token } = reuqire("./config");

const client = new Client({
  prefix,
  owners,
  nodes,
  token
});

const commandHandler = new CommandHandler(client);
const eventHandler = new EventHandler(client);

(async () => {
    await client.start();

    commandHandler.loadAll();
    eventHandler.loadAll();
})();