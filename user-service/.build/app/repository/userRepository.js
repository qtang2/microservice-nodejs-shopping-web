"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
// handle data access layer
class UserRepository {
    constructor() { }
    async CreateAccount({ email, password, salt, phone, userType }) {
        console.log("UserRepository CreateAccount in DB");
    }
}
exports.UserRepository = UserRepository;
//# sourceMappingURL=userRepository.js.map