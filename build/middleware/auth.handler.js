"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = exports.checkRoles = exports.logErrors = void 0;
const boom_1 = __importDefault(require("@hapi/boom"));
const default_1 = require("../config/default");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function logErrors(error, _request, _response, next) {
    console.error(error);
    next(error);
}
exports.logErrors = logErrors;
function checkRoles(...roles) {
    return (req, _res, next) => {
        console.log('Look at role: ', req.user);
        const user = req.user;
        console.log(roles);
        if (roles.includes(user.role)) {
            next();
        }
        else {
            next(boom_1.default.forbidden(`You don't have the required role to access.`));
        }
    };
}
exports.checkRoles = checkRoles;
function isAuthenticated() {
    return (req, _res, next) => {
        const { authorization } = req.headers;
        if (authorization) {
            const token = authorization === null || authorization === void 0 ? void 0 : authorization.split(' ')[1];
            const payload = jsonwebtoken_1.default.verify(token, default_1.config.jwtAccessSecret);
            // TODO check this
            console.log("--- token: ", token);
            console.log("--- payload: ", payload);
            req.payload = payload;
            next();
        }
        else {
            next(boom_1.default.forbidden(`You don't have the required permissions to access.`));
        }
    };
}
exports.isAuthenticated = isAuthenticated;
//# sourceMappingURL=auth.handler.js.map