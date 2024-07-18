"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppValidation = void 0;
const class_validator_1 = require("class-validator");
const AppValidation = async (input) => {
    const error = await (0, class_validator_1.validate)(input, {
        ValidationError: { target: true },
    });
    if (error.length) {
        return error;
    }
    return false;
};
exports.AppValidation = AppValidation;
//# sourceMappingURL=errors.js.map