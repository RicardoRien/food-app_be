"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTokens = exports.generateRefreshToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const default_1 = require("../config/default");
function generateAccessToken(user) {
    return jsonwebtoken_1.default.sign({ userId: user.id }, default_1.config.jwtAccessSecret, {
        expiresIn: '5m'
    });
}
exports.generateAccessToken = generateAccessToken;
function generateRefreshToken(user, jti) {
    return jsonwebtoken_1.default.sign({
        userId: user.id, jti
    }, default_1.config.jwtRefreshSecret, {
        expiresIn: '8h'
    });
}
exports.generateRefreshToken = generateRefreshToken;
function generateTokens(user, jti) {
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user, jti);
    return { accessToken, refreshToken };
}
exports.generateTokens = generateTokens;
//# sourceMappingURL=jwt.js.map