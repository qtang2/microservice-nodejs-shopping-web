import mongoose from "mongoose";

mongoose.set("strictQuery", false);

const ConnectDB = async () => {
  // TODO: not working for now, need to change in future
  // const DB_URL = process.env.DB_URL!;
  const DB_URL =
    "mongodb+srv://qtang2:tangq35357@cluster0.jwfzukc.mongodb.net/nodejs-sls-mc";
  console.log("Database ConnectDB url", DB_URL);

  try {
    await mongoose.connect(DB_URL);
    console.log("Database connected ...");
  } catch (error) {
    console.error("Database connected error", error);
  }
};

export { ConnectDB };
