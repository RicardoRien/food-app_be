"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
require("dotenv/config");
exports.default = {
    port: 3000,
    logLevel: "info",
    accessTokenPrivateKey: "",
    refreshTokenPrivateKey: "",
    smtp: {
        user: "xkej5hldqrbetllg@ethereal.email",
        pass: "EJ9xugUJJypCY91Xdy",
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
    },
};
exports.config = {
    env: process.env.NODE_ENV || 'dev',
    port: process.env.PORT || 3000,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbHost: process.env.DB_HOST,
    dbName: process.env.DB_NAME,
    dbPort: process.env.DB_PORT,
    apiKey: process.env.API_KEY,
    jwtSecret: process.env.JWT_SECRET,
    jwtAccessSecret: process.env.JWT_ACCESS_SECRET,
    jwtRefreshSecret: process.env.JWT_REFRESH_SECRET
};
//# sourceMappingURL=default.js.map