"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PullData = void 0;
const axios_1 = __importDefault(require("axios"));
// TODO: replace with env
const PRODUCT_SERVICE_URL = "http://127.0.0.1:3000/products-queue";
const PullData = async (requestData) => {
    return await axios_1.default.post(PRODUCT_SERVICE_URL, requestData);
};
exports.PullData = PullData;
//# sourceMappingURL=index.js.map