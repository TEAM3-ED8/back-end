"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorResponse = void 0;
const errorResponse = (res, statusCode, message, description) => {
    res.status(statusCode || 500).json({
        error: true,
        message,
        description
    });
};
exports.errorResponse = errorResponse;
