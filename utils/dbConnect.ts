import mongoose from "mongoose";

const dbConnect = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  const uri = process.env.mongo_url;
  if (uri) {
    console.log("Attempting to connect to  Mongoose");
    try {
      const connection = mongoose.connect(uri, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      });
      console.log("Success!");
      return connection;
    } catch (error) {
      console.error(error);
    }
  } else {
    throw new Error("No URI provided for Mongoose");
  }
};

export default dbConnect;
