const mongoose = require("mongoose");
require("dotenv").config();

const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION_URI);
  } catch (error) {
    console.error(error);
  }
};

mongoose.connection.once("open", () => {
  console.log("Connected To databse...");
});

module.exports = connectToDb;
