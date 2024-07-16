"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Payment = exports.Cart = exports.Profile = exports.Verify = exports.Login = exports.Signup = void 0;
const response_1 = require("../utility/response");
const userService_1 = require("../service/userService");
userService_1.UserService;
const service = new userService_1.UserService();
const Signup = async (event) => {
    console.log(event);
    return service.CreateUser(event);
};
exports.Signup = Signup;
const Login = async (event) => {
    console.log(event);
    return service.UserLogin(event);
};
exports.Login = Login;
const Verify = async (event) => {
    console.log(event);
    return service.VerifyUser(event);
};
exports.Verify = Verify;
const Profile = async (event) => {
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
};
exports.Profile = Profile;
const Cart = async (event) => {
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
};
exports.Cart = Cart;
const Payment = async (event) => {
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
};
exports.Payment = Payment;
//# sourceMappingURL=userHandler.js.map