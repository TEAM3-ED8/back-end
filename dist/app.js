"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const utilities_1 = require("./utilities");
const routes_1 = require("./routes");
const swagger_1 = __importDefault(require("./swagger"));
exports.app = (0, express_1.default)();
exports.app.use(utilities_1.corsMiddleware);
exports.app.use(express_1.default.json());
// Setup Swagger before registering routes
(0, swagger_1.default)(exports.app);
exports.app.get("/", (req, res) => {
    res.json({ message: "API Funcionando!" });
});
// Register routes
(0, routes_1.registerRoutes)(exports.app);
exports.app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    const description = err.description || "An unexpected error occurred";
    console.error(err);
    (0, utilities_1.errorResponse)(res, statusCode, message, description);
});
