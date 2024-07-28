import mongoose from "mongoose";

mongoose.set("strictQuery", false);

const ConnectDB = async () => {
  const DB_URL =
    "mongodb+srv://qtang2:tangq35357@cluster0.jwfzukc.mongodb.net/nodejs-sls-mc";
    // "mongodb+srv://qtang2:<password>@cluster0.jwfzukc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  //   const DB_URL = "mongodb+srv://qtang2:<password>@cluster0.jwfzukc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

  //   try {
  //     await mongoose.connect(DB_URL);

  //   } catch (error) {
  //     console.log("error connect DB", error);
  //   }

  try {
    await mongoose.connect(DB_URL);
    console.log("Database connected ...");
  } catch (error) {
    console.error("Database connected error", error);
  }
};

export { ConnectDB };
