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
const validator_handler_1 = require("../middleware/validator.handler");
const auth_service_1 = __importDefault(require("../services/auth.service"));
const auth_schema_1 = require("../schemas/auth.schema");
const router = express_1.default.Router();
const service = new auth_service_1.default();
router.post('/login', (0, validator_handler_1.validatorHandler)(auth_schema_1.createSessionSchema), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const token = yield service.login(email, password);
        res.json({ data: token });
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
//# sourceMappingURL=auth.router.js.map