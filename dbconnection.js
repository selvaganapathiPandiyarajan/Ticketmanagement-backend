const mongoose = require("mongoose");

const urls="mongodb://localhost/helpdesk"

const connections = {};

const connectToDatabase = async (key) => {
  if (urls) {
    try {
      await mongoose.connect(urls, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      connections[key] = mongoose.connection;
      console.log(`db connection done`);
    } catch (err) {
      console.error(`Error connecting to database:`, err);
      throw err;
    }
  }
  mongoose.set('bufferCommands', false);
mongoose.set('bufferTimeoutMS', 50000);
  return connections[key];
};

module.exports = {
  connectToDatabase
};