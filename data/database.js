const dotenv = require("dotenv");
dotenv.config();

const { MongoClient } = require("mongodb");

let client;

const initDb = (callback) => {
  if (client) {
    console.log("Database is already initialized!");
    return callback(null, client);
  }

  MongoClient.connect(process.env.MONGODB_URL)
    .then((mongoClient) => {
      client = mongoClient;
      console.log("Database connected!");
      callback(null, client);
    })
    .catch((err) => {
      callback(err);
    });
};

const getDatabase = () => {
  if (!client) {
    throw Error("Database not initialized");
  }
  return client.db();
};

module.exports = {
  initDb,
  getDatabase,
};
