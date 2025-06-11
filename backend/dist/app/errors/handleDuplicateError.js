"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleDuplicateError = (err) => {
    var _a;
    //extract value within double quotes
    if ((err === null || err === void 0 ? void 0 : err.code) === 11000) {
        const match = (_a = err === null || err === void 0 ? void 0 : err.message) === null || _a === void 0 ? void 0 : _a.match(/(["'])(?:(?=(\\?))\2.)*?\1/);
        const extractedMessage = match ? match[0] : "Duplicate key error";
        const errorSource = [{
                path: '',
                message: extractedMessage
            }];
        return {
            statusCode: 400,
            message: `Duplicate value: ${extractedMessage}`,
            errorSources: errorSource
        };
    }
    return {
        statusCode: 500,
        message: "An unknown error occurred",
        errorSources: []
    };
};
exports.default = handleDuplicateError;
