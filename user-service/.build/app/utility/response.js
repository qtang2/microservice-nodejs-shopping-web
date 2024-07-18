"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorResponse = exports.SuccessResponse = exports.formatResponse = void 0;
const formatResponse = (statusCode, message, data) => {
    const result = {
        statusCode,
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
        body: {},
    };
    if (data) {
        result.body = JSON.stringify({
            message,
            data,
        });
    }
    else {
        result.body = JSON.stringify({
            message,
        });
    }
    return result;
};
exports.formatResponse = formatResponse;
const SuccessResponse = (data) => {
    return (0, exports.formatResponse)(200, "success", data);
};
exports.SuccessResponse = SuccessResponse;
const ErrorResponse = (code = 1000, error) => {
    if (Array.isArray(error)) {
        const errorObject = error[0].constraints;
        const errorMessage = errorObject[Object.keys(errorObject)[0]] || "Error Occurred";
        return (0, exports.formatResponse)(code, errorMessage, errorMessage);
    }
    return (0, exports.formatResponse)(code, `${error}`, `${error}`);
};
exports.ErrorResponse = ErrorResponse;
//# sourceMappingURL=response.js.map