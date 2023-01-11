"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ormErrorHandler = exports.boomErrorHandler = exports.errorHandler = exports.logErrors = void 0;
const client_1 = require("@prisma/client");
function logErrors(error, _request, _response, next) {
    console.error(error);
    next(error);
}
exports.logErrors = logErrors;
function errorHandler(err, _req, res, _next) {
    res.status(500).json({
        data: {
            message: err.message,
            stack: err.stack,
        }
    });
}
exports.errorHandler = errorHandler;
function boomErrorHandler(err, _req, res, next) {
    if (err.isBoom) {
        const { output } = err;
        res.status(output.statusCode).json(output.payload);
    }
    next(err);
}
exports.boomErrorHandler = boomErrorHandler;
function ormErrorHandler(err, _req, res, next) {
    var _a;
    if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2003') {
            res.status(409).json({
                data: {
                    statusCode: 409,
                    error: 'ID not found',
                    code: err.code,
                    meta: err.meta,
                    message: 'Check error code in https://www.prisma.io/docs/reference/api-reference/error-reference',
                }
            });
        }
        else {
            res.status(409).json({
                data: {
                    statusCode: 409,
                    code: err.code,
                    error: (_a = err.meta) === null || _a === void 0 ? void 0 : _a.cause,
                    message: 'Check error code in https://www.prisma.io/docs/reference/api-reference/error-reference',
                }
            });
        }
    }
    next(err);
}
exports.ormErrorHandler = ormErrorHandler;
//# sourceMappingURL=error.handler.js.map