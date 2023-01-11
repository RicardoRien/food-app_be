"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./routes/index"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const error_handler_1 = require("./middleware/error.handler");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.get('/', (_req, res) => {
    res.json('Hello, world!');
});
const whitelist = [
    'http://localhost:8080',
    'http://localhost:3000',
    'http://localhost:3500'
];
const options = {
    origin: (origin, callback) => {
        if (whitelist.includes(origin) || !origin) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed'));
        }
    }
};
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)(options));
app.use(express_1.default.json());
(0, index_1.default)(app);
app.use(error_handler_1.logErrors);
app.use(error_handler_1.boomErrorHandler);
app.use(error_handler_1.ormErrorHandler);
app.use(error_handler_1.errorHandler);
app.listen(PORT, () => {
    console.log(`
    🚀 🚀 🚀 🚀 🚀 🚀 🚀 🚀 🚀 🚀 🚀 🚀
    🚀 Server running on port: ${PORT}  🚀
    🚀 🚀 🚀 🚀 🚀 🚀 🚀 🚀 🚀 🚀 🚀 🚀
  `);
});
//# sourceMappingURL=index.js.map