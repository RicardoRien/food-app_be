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
const uuid_1 = require("uuid");
const hashPassword_1 = require("../helpers/hashPassword");
/* import UserService from './user.service' */
const validatePassword_1 = require("../helpers/validatePassword");
const jwt_1 = require("../utils/jwt");
/* import boom from '@hapi/boom' */
/* import UserService from './user.service' */
/* import { signJwt } from '../utils/jwt' */
const prisma = new client_1.PrismaClient();
/* const service = new UserService() */
class AuthService {
    addRefreshTokenToWhitelist(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { jti, refreshToken, userId } = data;
            let hashedRefreshToken = yield (0, hashPassword_1.hashPassword)(refreshToken).then((value) => {
                const hashedToken = value;
                return hashedToken;
            });
            return prisma.refreshToken.create({
                data: {
                    id: jti,
                    hashedToken: hashedRefreshToken,
                    userId
                },
            });
        });
    }
    // Used to check if the token sent by the client is in the database.
    findRefreshTokenById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma.refreshToken.findUnique({
                where: { id }
            });
        });
    }
    // soft delete tokens after usage.
    deleteRefreshToken(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma.refreshToken.update({
                where: { id },
                data: { revoked: true }
            });
        });
    }
    revokeTokens(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma.refreshToken.updateMany({
                where: { userId },
                data: { revoked: true }
            });
        });
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma.user.findUnique({ where: { email } });
            const jti = (0, uuid_1.v4)();
            if (!user) {
                throw boom_1.default.notFound('Email not found');
            }
            const validPassword = yield (0, validatePassword_1.validatePassword)(user.password, password);
            console.log('--- password: ', password);
            console.log('--- user.password: ', user.password);
            if (!validPassword) {
                throw boom_1.default.forbidden('Invalid password!');
            }
            const { accessToken, refreshToken } = (0, jwt_1.generateTokens)(user, jti);
            yield this.addRefreshTokenToWhitelist({ jti, refreshToken, userId: user.id });
            return { accessToken, refreshToken };
        });
    }
}
exports.default = AuthService;
//# sourceMappingURL=auth.service.js.map