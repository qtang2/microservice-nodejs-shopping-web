"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBOperation = void 0;
const databaseClient_1 = require("../utility/databaseClient");
class DBOperation {
    constructor() { }
    async executeQuery(queryString, values) {
        const client = (0, databaseClient_1.DBClient)();
        await client.connect();
        const result = await client.query(queryString, values);
        await client.end();
        return result;
    }
}
exports.DBOperation = DBOperation;
//# sourceMappingURL=dbOperation.js.map