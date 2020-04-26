const { Client } = require("./structures");
const { prefix, owners, nodes, token } = require("./config");

const client = new Client({
  prefix,
  owners,
  nodes,
  token
});


(async () => {
  await client.start();
})();