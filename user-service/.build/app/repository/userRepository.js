"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const databaseClient_1 = require("../utility/databaseClient");
// handle data access layer
class UserRepository {
    constructor() { }
    async CreateAccount({ email, password, salt, phone, userType }) {
        console.log("UserRepository CreateAccount in DB");
        const client = (0, databaseClient_1.DBClient)();
        await client.connect();
        const queryString = "INSERT INTO users(phone, email, password, salt, user_type) VALUES($1,$2,$3,$4,$5) RETURNING *";
        const values = [phone, email, password, salt, userType];
        const result = await client.query(queryString, values);
        console.log("UserRepository CreateAccount in DB result", result);
        await client.end();
        if (result.rowCount && result.rowCount > 0) {
            return result.rows[0];
        }
    }
    async FindAccount(email) {
        console.log("UserRepository FindAccount in DB");
        const client = (0, databaseClient_1.DBClient)();
        await client.connect();
        const queryString = "SELECT user_id, phone, email, user_type, salt, password FROM users WHERE email=$1";
        const values = [email];
        const result = await client.query(queryString, values);
        await client.end();
        if (!result.rowCount || result.rowCount < 1) {
            console.log("User does not exist with provided email id!");
            throw new Error("User does not exist with provided email id!");
        }
        return result.rows[0];
    }
}
exports.UserRepository = UserRepository;
//# sourceMappingURL=userRepository.js.map