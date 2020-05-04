const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
    });

    console.log("MongoDB Connection successfull");
  } catch (err) {
    console.log(`Error ${err.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
