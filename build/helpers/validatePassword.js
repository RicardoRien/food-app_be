"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePassword = void 0;
const argon2_1 = __importDefault(require("argon2"));
function validatePassword(hashedPassword, userPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('___hashedPassword: ', hashedPassword);
            console.log('___userPassword: ', userPassword);
            return yield argon2_1.default.verify(hashedPassword, userPassword);
        }
        catch (e) {
            console.error(e, "Could not validate password");
            return false;
        }
    });
}
exports.validatePassword = validatePassword;
//# sourceMappingURL=validatePassword.js.map