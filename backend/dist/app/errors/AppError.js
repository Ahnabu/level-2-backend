"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AppError extends Error {
    constructor(statusCode, message, stack = '') {
        super(message);
        this.statusCode = statusCode;
        if (stack) {
            this.stack = stack; // Assign the provided stack trace if available
        }
        else {
            Error.captureStackTrace(this, this.constructor);
        }
        // Capture the stack trace for better debugging
    }
}
exports.default = AppError;
