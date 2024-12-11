const { Client } = require("@elastic/elasticsearch");

const client = new Client({
  cloud: {
    id: process.env.ELASTIC_CLOUD_ID,
  },
  auth: {
    apiKey: process.env.ELASTIC_API_KEY,
  },
});

client.ping({}, (err, response) => {
  if (err) {
    console.error("Elasticsearch is down!", err);
  } else {
    console.log("Elasticsearch is up!", response);
  }
});

module.exports = client;
