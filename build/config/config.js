"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const config = {
    env: process.env.NODE_ENV || 'dev',
    port: process.env.PORT || 3000,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbHost: process.env.DB_HOST,
    dbName: process.env.DB_NAME,
    apiKey: process.env.API_KEY,
    dbPort: process.env.DB_PORT,
    accessTokenPrivateKey: "ACCESS_TOKEN_PRIVATE_KEY",
    accessTokenPublicKey: "ACCESS_TOKEN_PUBLIC_KEY",
    refreshTokenPrivateKey: "REFRESH_PRIVATE_KEY",
    refreshTokenPublicKey: "REFRESH_PUBLIC_KEY",
};
exports.default = config;
//# sourceMappingURL=config.js.map