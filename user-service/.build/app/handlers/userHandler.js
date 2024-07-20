"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Payment = exports.Cart = exports.Profile = exports.Verify = exports.Login = exports.Signup = void 0;
const core_1 = __importDefault(require("@middy/core"));
const http_json_body_parser_1 = __importDefault(require("@middy/http-json-body-parser"));
const tsyringe_1 = require("tsyringe");
const response_1 = require("../utility/response");
const userService_1 = require("../service/userService");
userService_1.UserService;
const service = tsyringe_1.container.resolve(userService_1.UserService);
exports.Signup = (0, core_1.default)(async (event) => {
    return service.CreateUser(event);
}).use((0, http_json_body_parser_1.default)());
exports.Login = (0, core_1.default)(async (event) => {
    console.log(event);
    return service.UserLogin(event);
}).use((0, http_json_body_parser_1.default)());
exports.Verify = (0, core_1.default)(async (event) => {
    console.log(event);
    const httpMethod = event.requestContext.http.method.toLowerCase();
    if (httpMethod === "post") {
        return service.VerifyUser(event);
    }
    else if (httpMethod === "get") {
        return service.GetVerificationToke(event);
    }
    else {
        return (0, response_1.ErrorResponse)(404, "requested method is not supported!");
    }
}).use((0, http_json_body_parser_1.default)());
exports.Profile = (0, core_1.default)(async (event) => {
    console.log(event);
    const httpMethod = event.requestContext.http.method.toLowerCase();
    if (httpMethod === "post") {
        return service.CreateProfile(event);
    }
    else if (httpMethod === "put") {
        return service.EditProfile(event);
    }
    else if (httpMethod === "get") {
        return service.GetProfile(event);
    }
    else {
        return (0, response_1.ErrorResponse)(404, "requested method is not supported!");
    }
}).use((0, http_json_body_parser_1.default)());
exports.Cart = (0, core_1.default)(async (event) => {
    console.log(event);
    const httpMethod = event.requestContext.http.method.toLowerCase();
    if (httpMethod === "post") {
        return service.CreateCart(event);
    }
    else if (httpMethod === "put") {
        return service.EditCart(event);
    }
    else if (httpMethod === "get") {
        return service.GetCart(event);
    }
    else {
        return (0, response_1.ErrorResponse)(404, "requested method is not supported!");
    }
}).use((0, http_json_body_parser_1.default)());
exports.Payment = (0, core_1.default)(async (event) => {
    console.log(event);
    const httpMethod = event.requestContext.http.method.toLowerCase();
    if (httpMethod === "post") {
        return service.CreatePayment(event);
    }
    else if (httpMethod === "put") {
        return service.EditPayment(event);
    }
    else if (httpMethod === "get") {
        return service.GetPayment(event);
    }
    else {
        return (0, response_1.ErrorResponse)(404, "requested method is not supported!");
    }
}).use((0, http_json_body_parser_1.default)());
//# sourceMappingURL=userHandler.js.map