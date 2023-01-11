"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpException = void 0;
class HttpException extends Error {
    constructor(statusCode, message, error) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.error = error || null;
    }
}
exports.HttpException = HttpException;
//# sourceMappingURL=http-exception.js.map