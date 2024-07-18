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
const userRepository_1 = require("../repository/userRepository");
const response_1 = require("../utility/response");
let UserService = class UserService {
    constructor(repository) {
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
        this.repository = repository;
    }
    async CreateUser(event) {
        console.log("CreateUser event ==>", event);
        const body = event.body;
        console.log("CreateUser event ==>", body);
        await this.repository.CreateUserOperation();
        return (0, response_1.SuccessResponse)({ message: "sign up response" });
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, tsyringe_1.autoInjectable)() // inject whatever needed to create this user service
    ,
    __metadata("design:paramtypes", [userRepository_1.UserRepository])
], UserService);
//# sourceMappingURL=userService.js.map