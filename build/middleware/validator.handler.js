"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatorHandler = void 0;
const zod_1 = require("zod");
const validatorHandler = (schema) => (req, res, next) => {
    try {
        schema.parse({
            body: req.body,
            query: req.query,
            params: req.params
        });
        return next();
    }
    catch (err) {
        if (err instanceof zod_1.z.ZodError) {
            console.error('validatorHandler: ', err);
            return res.status(400).json(err.issues.map(issue => ({
                path: issue.path,
                message: issue.message,
            })));
        }
        else {
            return res.status(400);
        }
    }
};
exports.validatorHandler = validatorHandler;
//# sourceMappingURL=validator.handler.js.map