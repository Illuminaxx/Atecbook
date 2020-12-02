require("dotenv").config();
const mongoose = require("mongoose");

const mongoURI = process.env.MONGO_URI;

//const mongoURI = "mongodb://localhost:27017/socialNetwork";
module.exports = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    console.log("Mongo Database is connected");
  } catch (err) {
    console.error(err.message);
    //exit process when fail to connect to db
    process.exit(1);
  }
};
