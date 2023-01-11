"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_jwt_1 = require("passport-jwt");
const config_1 = __importDefault(require("../../../config/config"));
const options = {
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config_1.default.jwtSecret,
};
const JwtStrategy = new passport_jwt_1.Strategy(options, (payload, done) => {
    return done(null, payload);
});
exports.default = JwtStrategy;
//# sourceMappingURL=jwt.strategy.js.map