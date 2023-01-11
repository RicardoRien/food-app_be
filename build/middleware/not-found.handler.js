"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundHandler = void 0;
const notFoundHandler = (_request, response, _next) => {
    const message = "Resource not found";
    response.status(404).send(message);
};
exports.notFoundHandler = notFoundHandler;
//# sourceMappingURL=not-found.handler.js.map