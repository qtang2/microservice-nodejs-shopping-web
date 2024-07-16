"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const response_1 = require("../utility/response");
class UserService {
    constructor() {
        this.CreateUser = (event) => {
            return (0, response_1.SuccessResponse)({ message: "sign up response" });
        };
        this.UserLogin = (event) => {
            return (0, response_1.SuccessResponse)({ message: "UserLogin response" });
        };
        this.VerifyUser = (event) => {
            return (0, response_1.SuccessResponse)({ message: "VerifyUser response" });
        };
        /**
         * User Profile
         */
        this.CreateProfile = (event) => {
            return (0, response_1.SuccessResponse)({ message: "CreateProfile response" });
        };
        this.GetProfile = (event) => {
            return (0, response_1.SuccessResponse)({ message: "GetProfile response" });
        };
        this.EditProfile = (event) => {
            return (0, response_1.SuccessResponse)({ message: "EditProfile response" });
        };
        /**
         * Cart
         */
        this.CreateCart = (event) => {
            return (0, response_1.SuccessResponse)({ message: "CreateCart response" });
        };
        this.GetCart = (event) => {
            return (0, response_1.SuccessResponse)({ message: "GetCart response" });
        };
        this.EditCart = (event) => {
            return (0, response_1.SuccessResponse)({ message: "EditCart response" });
        };
        /**
         * Payment
         */
        this.CreatePayment = (event) => {
            return (0, response_1.SuccessResponse)({ message: "CreatePayment response" });
        };
        this.GetPayment = (event) => {
            return (0, response_1.SuccessResponse)({ message: "GetPayment response" });
        };
        this.EditPayment = (event) => {
            return (0, response_1.SuccessResponse)({ message: "EditPayment response" });
        };
    }
}
exports.UserService = UserService;
//# sourceMappingURL=userService.js.map