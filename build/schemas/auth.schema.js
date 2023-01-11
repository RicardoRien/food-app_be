"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSessionSchema = void 0;
const zod_1 = require("zod");
const email = (0, zod_1.string)()
    .email({ message: "Invalid email address" })
    .min(1, "Must provide an Email");
const password = (0, zod_1.string)().min(4, 'Password too short');
exports.createSessionSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        email: email,
        password: password,
    })
});
//# sourceMappingURL=auth.schema.js.map