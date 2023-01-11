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
const client_1 = require("@prisma/client");
const boom_1 = __importDefault(require("@hapi/boom"));
const mailer_1 = __importDefault(require("../utils/mailer"));
const nanoid_1 = require("nanoid");
const hashPassword_1 = require("../helpers/hashPassword");
/* import { v4 as uuidv4 } from 'uuid' */
/* import { generateTokens } from '../utils/jwt' */
/* import AuthService from './auth.service' */
const prisma = new client_1.PrismaClient();
/* const service = new AuthService() */
class UserService {
    createNewUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password, role } = data;
            const hash = yield (0, hashPassword_1.hashPassword)(password);
            const newUser = yield prisma.user.create({
                data: {
                    name,
                    email,
                    password: hash,
                    role,
                },
                select: { name: true, email: true, role: true, id: true, verificationCode: true, verified: true }
            });
            yield (0, mailer_1.default)({
                from: 'test@example.com',
                to: newUser.email,
                subject: 'Please verify you account',
                text: `verification code: ${newUser.verificationCode}. ID: ${newUser.id}`
            });
            return newUser;
        });
    }
    find() {
        return __awaiter(this, void 0, void 0, function* () { return yield prisma.user.findMany(); });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = yield prisma.user.findUnique({ where: { id } });
            if (!userId) {
                throw boom_1.default.notFound('ID not found');
            }
            return userId;
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const userEmail = yield prisma.user.findUnique({ where: { email } });
            if (!userEmail) {
                throw boom_1.default.notFound('Email not found');
            }
            return userEmail;
        });
    }
    verifyUser(id, verificationCode) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.findById(id);
            // const jti = uuidv4()
            // const { accessToken, refreshToken } = generateTokens(user, jti)
            if (user.verified) {
                throw boom_1.default.forbidden('User is already verified');
            }
            if (user.verificationCode === verificationCode) {
                // await service.addRefreshTokenToWhitelist({ jti, refreshToken, userId: id })
                const verifiedUser = yield prisma.user.update({
                    where: { id: id },
                    data: { verified: true },
                    select: { name: true, email: true, role: true, id: true, verified: true }
                });
                return verifiedUser;
            }
            throw boom_1.default.forbidden('Could not verify user');
        });
    }
    forgotPassword(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.findByEmail(email);
            if (!user.verified) {
                throw boom_1.default.forbidden('User is not verified');
            }
            const passwordResetCode = (0, nanoid_1.nanoid)();
            yield prisma.user.update({
                where: { email: email },
                data: { passwordResetCode: passwordResetCode },
            });
            yield (0, mailer_1.default)({
                from: 'test@example.com',
                to: user.email,
                subject: 'Reset your password',
                text: `Password reset code: ${passwordResetCode}. ID: ${user.id}`
            });
            console.log(`Password reset code: ${passwordResetCode} / ID: ${user.id}`);
            return 'Password reset code has been send to your email';
        });
    }
    resetPassword(id, passwordResetCode, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.findById(id);
            if (!user.passwordResetCode || user.passwordResetCode !== passwordResetCode) {
                throw boom_1.default.badRequest('Could not reset user password');
            }
            const newPasswordHashed = yield (0, hashPassword_1.hashPassword)(password);
            yield prisma.user.update({
                where: { id: id },
                data: {
                    password: newPasswordHashed, passwordResetCode: null
                }
            });
            return 'Successfully updated password';
        });
    }
}
exports.default = UserService;
//# sourceMappingURL=user.service.js.map