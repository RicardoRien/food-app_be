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
const user_service_1 = __importDefault(require("./../services/user.service"));
const user_schema_1 = require("../schemas/user.schema");
const validator_handler_1 = require("../middleware/validator.handler");
const router = express_1.default.Router();
const service = new user_service_1.default();
router.get('/', (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield service.find();
        res.json({ data: users });
    }
    catch (error) {
        next(error);
    }
}));
router.post('/', (0, validator_handler_1.validatorHandler)(user_schema_1.createUserSchema), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const newUser = yield service.createNewUser(body);
        console.log({ data: newUser });
        res.status(201).json({ data: newUser });
    }
    catch (error) {
        next(error);
    }
}));
router.get('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield service.findById(id);
        res.json({ data: user });
    }
    catch (error) {
        next(error);
    }
}));
router.post('/verify/:id/:verificationCode', (0, validator_handler_1.validatorHandler)(user_schema_1.verifyUserSchema), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, verificationCode } = req.params;
        const verifyUser = yield service.verifyUser(id, verificationCode);
        res.status(201).json({ data: verifyUser });
    }
    catch (error) {
        next(error);
    }
}));
router.post('/forgotpassword', (0, validator_handler_1.validatorHandler)(user_schema_1.forgotPasswordSchema), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const userForgotPassword = yield service.forgotPassword(email);
        res.status(201).json({ data: userForgotPassword });
    }
    catch (error) {
        next(error);
    }
}));
router.post('/resetpassword/:id/:passwordResetCode', (0, validator_handler_1.validatorHandler)(user_schema_1.resetPasswordSchema), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, passwordResetCode } = req.params;
        const { password } = req.body;
        const userForgotPassword = yield service.resetPassword(id, passwordResetCode, password);
        res.status(201).json({ data: userForgotPassword });
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
//# sourceMappingURL=user.router.js.map