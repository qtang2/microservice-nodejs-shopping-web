import { ConnectDB } from "./db-connection";
console.log("index.ts in utility folder is being executed");

ConnectDB()
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log("Database err", err);
  });
