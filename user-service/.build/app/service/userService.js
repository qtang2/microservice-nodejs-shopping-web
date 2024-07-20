"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const tsyringe_1 = require("tsyringe");
const class_transformer_1 = require("class-transformer");
const userRepository_1 = require("../repository/userRepository");
const response_1 = require("../utility/response");
const SignupInputs_1 = require("../models/dto/SignupInputs");
const errors_1 = require("../utility/errors");
const password_1 = require("../utility/password");
const LoginInputs_1 = require("../models/dto/LoginInputs");
const notification_1 = require("../utility/notification");
let UserService = class UserService {
    constructor(repository) {
        this.UserLogin = async (event) => {
            try {
                const body = event.body;
                const input = (0, class_transformer_1.plainToClass)(LoginInputs_1.LoginInput, body);
                const error = await (0, errors_1.AppValidation)(input);
                if (error)
                    return (0, response_1.ErrorResponse)(404, error);
                const { email, password } = input;
                const data = await this.repository.FindAccount(email);
                const verified = await (0, password_1.ValidatePassword)(password, data.password, data.salt);
                if (!verified) {
                    throw Error("Password does not match!");
                }
                const token = (0, password_1.GetToken)(data);
                if (data && token)
                    return (0, response_1.SuccessResponse)({ token });
            }
            catch (error) {
                console.log("UserLogin error ==>", error);
                return (0, response_1.ErrorResponse)(500, error);
            }
        };
        this.GetVerificationToke = (event) => {
            const token = event.headers.authorization;
            if (token) {
                const payload = (0, password_1.VerifyToken)(token);
                if (payload) {
                    const { code, expiry } = (0, notification_1.GenerateAccessCode)();
                    const response = (0, notification_1.SendVerificationCode)(code, payload.phone);
                    return (0, response_1.SuccessResponse)({ message: "Verification code is sent to your registered mobile number!" });
                }
            }
            return (0, response_1.SuccessResponse)({ message: "GetVerificationToke response" });
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
        this.repository = repository;
    }
    async CreateUser(event) {
        try {
            const body = event.body;
            const input = (0, class_transformer_1.plainToClass)(SignupInputs_1.SignupInput, body);
            const error = await (0, errors_1.AppValidation)(input);
            if (error)
                return (0, response_1.ErrorResponse)(404, error);
            const { email, password, phone } = input;
            const salt = await (0, password_1.GetSalt)();
            const hashedPw = await (0, password_1.GetHashedPassword)(password, salt);
            const data = await this.repository.CreateAccount({
                email,
                phone,
                password: hashedPw,
                userType: "BUYER",
                salt,
            });
            if (data)
                return (0, response_1.SuccessResponse)(data);
        }
        catch (error) {
            console.log("CreateUser error ==>", error);
            return (0, response_1.ErrorResponse)(500, error);
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, tsyringe_1.autoInjectable)() // inject whatever needed to create this user service
    ,
    __metadata("design:paramtypes", [userRepository_1.UserRepository])
], UserService);
//# sourceMappingURL=userService.js.map