import mongoose from "mongoose";

mongoose.set("strictQuery", false);

const ConnectDB = async () => {
  const DB_URL = "";
  try {
    await mongoose.connect(DB_URL);
  } catch (error) {
    console.log("error connect DB", error);
  }
};

export {ConnectDB}
