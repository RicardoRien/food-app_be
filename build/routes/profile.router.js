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
const express_1 = __importDefault(require("express"));
const auth_handler_1 = require("../middleware/auth.handler");
const user_service_1 = __importDefault(require("./../services/user.service"));
const router = express_1.default.Router();
const service = new user_service_1.default();
router.get('/', auth_handler_1.isAuthenticated, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.payload;
        console.log('+++++++++   profile.router.ID: ', id);
        const users = yield service.findById(id);
        res.json({ data: users });
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
//# sourceMappingURL=profile.router.js.map