"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken")); // 1. Import SignOptions
const createToken = (jwtPayload, secret, expiresIn) => {
    // 2. Explicitly define the options with the correct type
    const signOptions = {
        expiresIn,
    };
    // 3. Pass the typed options object to the function
    return jsonwebtoken_1.default.sign(jwtPayload, secret, signOptions);
};
exports.createToken = createToken;
const verifyToken = (token, secret) => {
    return jsonwebtoken_1.default.verify(token, secret);
};
exports.verifyToken = verifyToken;
