import mongoose from "mongoose";

const dbConnect = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  const uri = process.env.mongo_uri;
  if (uri) {
    console.log("Attempting to connect to  Mongoose");

    const connection = mongoose.connect(uri, {
      sslValidate: false,
    });
    console.log("Success!");
    return connection;
  } else {
    throw new Error("No URI provided for Mongoose");
  }
};

export default dbConnect;
