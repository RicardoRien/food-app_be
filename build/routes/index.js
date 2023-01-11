"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_router_1 = __importDefault(require("./user.router"));
const auth_router_1 = __importDefault(require("./auth.router"));
const profile_router_1 = __importDefault(require("./profile.router"));
function routerApi(app) {
    const router = express_1.default.Router();
    app.use('/api/v1', router);
    router.use('/user', user_router_1.default);
    router.use('/auth', auth_router_1.default);
    router.use('/profile', profile_router_1.default);
}
exports.default = routerApi;
//# sourceMappingURL=index.js.map