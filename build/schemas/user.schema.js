"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordSchema = exports.forgotPasswordSchema = exports.verifyUserSchema = exports.getUserSchema = exports.updateUserSchema = exports.createUserSchema = void 0;
const zod_1 = require("zod");
const id = (0, zod_1.string)({ required_error: "Password is required" });
const name = (0, zod_1.string)();
const email = (0, zod_1.string)().email({ message: "Invalid email address" });
const password = (0, zod_1.string)().min(4, 'Password too short');
const passwordConfirmation = (0, zod_1.string)({ required_error: "Password Confirmation is required" })
    .min(1, 'Password Confirmation is required');
const passwordResetCode = (0, zod_1.string)().min(1);
const role = (0, zod_1.string)();
const verificationCode = (0, zod_1.string)({ required_error: "Verification Code is required" });
exports.createUserSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        name: name.min(4, 'Name too short'),
        email: email.min(1, 'Email too short'),
        password: password,
        role: role.min(1)
    })
});
exports.updateUserSchema = (0, zod_1.object)({
    email: email,
    role: role
});
exports.getUserSchema = (0, zod_1.object)({
    email: email.min(1),
});
exports.verifyUserSchema = (0, zod_1.object)({
    params: (0, zod_1.object)({
        id: id,
        verificationCode: verificationCode
    }),
});
exports.forgotPasswordSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        email: email
    })
});
exports.resetPasswordSchema = (0, zod_1.object)({
    params: (0, zod_1.object)({
        id: id,
        passwordResetCode: passwordResetCode
    }),
    body: (0, zod_1.object)({
        password: password,
        passwordConfirmation: passwordConfirmation
    }).refine((data) => data.password === data.passwordConfirmation, {
        message: "Passwords do not match",
        path: ['passwordConfirmation']
    })
});
//# sourceMappingURL=user.schema.js.map