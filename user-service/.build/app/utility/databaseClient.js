"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBClient = void 0;
const pg_1 = require("pg");
const DBClient = () => {
    return new pg_1.Client({
        user: "user_service",
        password: "user_service#2024",
        host: "user-service.cnacwmuskmv5.ap-southeast-2.rds.amazonaws.com",
        database: "user_service",
        port: 5432,
        ssl: {
            rejectUnauthorized: false,
            ca: "/Users/qiantang/Developer/Code/db-ssl/ap-southeast-2-bundle.pem",
        },
    });
};
exports.DBClient = DBClient;
//# sourceMappingURL=databaseClient.js.map