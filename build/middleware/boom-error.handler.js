"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.boomErrorHandler = void 0;
function boomErrorHandler(err, _req, res, next) {
    if (err.isBoom) {
        const { output } = err;
        res.status(output.statusCode).json(output.payload);
    }
    else {
        next(err);
    }
}
exports.boomErrorHandler = boomErrorHandler;
//# sourceMappingURL=boom-error.handler.js.map