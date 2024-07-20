"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyToken = exports.GetToken = exports.ValidatePassword = exports.GetHashedPassword = exports.GetSalt = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const APP_SECRET = "our_app_secret"; // TODO: set env for this in yml
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
const GetToken = ({ user_id, phone, email, userType }) => {
    return jsonwebtoken_1.default.sign({ user_id, phone, email, userType }, APP_SECRET, {
        expiresIn: "30d",
    });
};
exports.GetToken = GetToken;
const VerifyToken = (token) => {
    try {
        if (token != "") {
            const payload = jsonwebtoken_1.default.verify(token.split(" ")[1], APP_SECRET);
            return payload;
        }
        return false;
    }
    catch (error) {
        console.log("VerifyToken error", error);
        return false;
    }
};
exports.VerifyToken = VerifyToken;
//# sourceMappingURL=password.js.map