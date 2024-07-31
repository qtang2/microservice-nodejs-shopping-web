import mongoose from "mongoose";

mongoose.set("strictQuery", false);

const ConnectDB = async () => {
  // TODO: not working for now, need to change in future
  const DB_URL = process.env.DB_URL!;
  console.log("Database ConnectDB url", DB_URL);

  try {
    await mongoose.connect(DB_URL);
    console.log("Database connected ...");
  } catch (error) {
    console.error("Database connected error", error);
  }
};

export { ConnectDB };
