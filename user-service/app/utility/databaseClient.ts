import { Client } from "pg";

export const DBClient = () => {
  return new Client({
    user: "user_service",
    password: "user_service#2024",
    host: "user-service.cnacwmuskmv5.ap-southeast-2.rds.amazonaws.com",
    database: "user_service",
    port: 5432,
  });
};
