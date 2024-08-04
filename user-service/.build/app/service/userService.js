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
const UpdateInput_1 = require("../models/dto/UpdateInput");
const dateHelper_1 = require("../utility/dateHelper");
const AddressInput_1 = require("../models/dto/AddressInput");
let UserService = class UserService {
    constructor(repository) {
        this.UserLogin = async (event) => {
            try {
                const input = (0, class_transformer_1.plainToClass)(LoginInputs_1.LoginInput, event.body);
                const error = await (0, errors_1.AppValidation)(input);
                if (error)
                    return (0, response_1.ErrorResponse)(404, error);
                const { email, password } = input;
                const data = await this.repository.findAccount(email);
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
        this.GetVerificationToke = async (event) => {
            const token = event.headers.authorization;
            if (!token)
                return (0, response_1.ErrorResponse)(403, "authorization failed");
            const payload = (0, password_1.VerifyToken)(token);
            if (!payload || !payload.user_id)
                return (0, response_1.ErrorResponse)(403, "authorization failed");
            const { code, expiry } = (0, notification_1.GenerateAccessCode)();
            // save on DB to confirm the verification
            await this.repository.updateVerificationCode(payload.user_id, code, expiry);
            const response = (0, notification_1.SendVerificationCode)(code, payload.phone);
            return (0, response_1.SuccessResponse)({
                message: "Verification code is sent to your registered mobile number!",
            });
        };
        this.VerifyUser = async (event) => {
            const token = event.headers.authorization;
            if (!token)
                return (0, response_1.ErrorResponse)(403, "authorization failed");
            const payload = (0, password_1.VerifyToken)(token);
            if (!payload || !payload.user_id)
                return (0, response_1.ErrorResponse)(403, "authorization failed");
            const input = (0, class_transformer_1.plainToClass)(UpdateInput_1.VerificationInput, event.body);
            const error = await (0, errors_1.AppValidation)(input);
            if (error)
                return (0, response_1.ErrorResponse)(404, error);
            const userAccount = await this.repository.findAccount(payload.email);
            const { verification_code, expiry } = userAccount;
            if (verification_code === parseInt(input.code) && expiry) {
                const diff = (0, dateHelper_1.TimeDifference)(expiry, new Date().toISOString(), "m");
                if (diff > 0) {
                    console.log("verified successfully");
                    await this.repository.updateVerifyUser(payload.user_id);
                }
                else {
                    return (0, response_1.ErrorResponse)(404, "Verification code is expired");
                }
            }
            return (0, response_1.SuccessResponse)({ message: "User verified" });
        };
        /**
         * User Profile
         */
        this.CreateProfile = async (event) => {
            try {
                const token = event.headers.authorization;
                if (!token)
                    return (0, response_1.ErrorResponse)(403, "authorization failed");
                const payload = (0, password_1.VerifyToken)(token);
                if (!payload || !payload.user_id)
                    return (0, response_1.ErrorResponse)(403, "authorization failed");
                const input = (0, class_transformer_1.plainToClass)(AddressInput_1.ProfileInput, event.body);
                const error = await (0, errors_1.AppValidation)(input);
                if (error)
                    return (0, response_1.ErrorResponse)(404, error);
                // DB operation
                const result = await this.repository.createProfile(payload.user_id, input);
                console.log(result);
                return (0, response_1.SuccessResponse)({ message: "CreateProfile response" });
            }
            catch (error) {
                console.log("CreateProfile error ==>", error);
                return (0, response_1.ErrorResponse)(500, error);
            }
        };
        this.GetProfile = async (event) => {
            try {
                const token = event.headers.authorization;
                if (!token)
                    return (0, response_1.ErrorResponse)(403, "authorization failed");
                const payload = (0, password_1.VerifyToken)(token);
                if (!payload || !payload.user_id)
                    return (0, response_1.ErrorResponse)(403, "authorization failed");
                const result = await this.repository.getProfile(payload.user_id);
                console.log(result);
                return (0, response_1.SuccessResponse)(result);
            }
            catch (error) {
                console.log("GetProfile error ==>", error);
                return (0, response_1.ErrorResponse)(500, error);
            }
        };
        this.EditProfile = async (event) => {
            try {
                const token = event.headers.authorization;
                if (!token)
                    return (0, response_1.ErrorResponse)(403, "authorization failed");
                const payload = (0, password_1.VerifyToken)(token);
                if (!payload || !payload.user_id)
                    return (0, response_1.ErrorResponse)(403, "authorization failed");
                const input = (0, class_transformer_1.plainToClass)(AddressInput_1.ProfileInput, event.body);
                const error = await (0, errors_1.AppValidation)(input);
                if (error)
                    return (0, response_1.ErrorResponse)(404, error);
                // DB operation
                const result = await this.repository.editProfile(payload.user_id, input);
                console.log("service EditProfile", result);
                return (0, response_1.SuccessResponse)({ message: "profile updated!" });
            }
            catch (error) {
                console.log("EditProfile error ==>", error);
                return (0, response_1.ErrorResponse)(500, error);
            }
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
    async ResponseWithError(event) {
        return (0, response_1.ErrorResponse)(404, "request method is not supported");
    }
    async CreateUser(event) {
        try {
            const input = (0, class_transformer_1.plainToClass)(SignupInputs_1.SignupInput, event.body);
            const error = await (0, errors_1.AppValidation)(input);
            if (error)
                return (0, response_1.ErrorResponse)(404, error);
            const { email, password, phone } = input;
            const salt = await (0, password_1.GetSalt)();
            const hashedPw = await (0, password_1.GetHashedPassword)(password, salt);
            const data = await this.repository.createAccount({
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