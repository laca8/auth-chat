const mongoose = require("mongoose");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config("../.env");
const db = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("db connected");
  } catch (err) {
    console.log(err);
  }
};
module.exports = db;
