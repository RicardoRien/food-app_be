"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashToken = void 0;
const crypto_1 = __importDefault(require("crypto"));
function hashToken(token) {
    return crypto_1.default.createHash('sha512').update(token).digest('hex');
}
exports.hashToken = hashToken;
//# sourceMappingURL=hashToken.js.map