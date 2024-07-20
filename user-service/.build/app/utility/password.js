"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidatePassword = exports.GetHashedPassword = exports.GetSalt = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const GetSalt = async () => {
    return await bcrypt_1.default.genSalt();
};
exports.GetSalt = GetSalt;
const GetHashedPassword = async (password, salt) => {
    return await bcrypt_1.default.hash(password, salt);
};
exports.GetHashedPassword = GetHashedPassword;
const ValidatePassword = async (enteredPw, savedPw, salt) => {
    return (await (0, exports.GetHashedPassword)(enteredPw, salt)) === savedPw;
};
exports.ValidatePassword = ValidatePassword;
//# sourceMappingURL=password.js.map