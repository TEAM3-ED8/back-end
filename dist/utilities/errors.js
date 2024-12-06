"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerError = exports.ClientError = void 0;
class ClientError extends Error {
    constructor(message, statusCode = 400, description = "") {
        super(message);
        this.name = "ClientError";
        this.statusCode = statusCode;
        this.description = description;
    }
}
exports.ClientError = ClientError;
class ServerError extends ClientError {
    constructor(message, statusCode = 500, description = "") {
        super(message, statusCode, description);
        this.name = "ServerError";
    }
}
exports.ServerError = ServerError;
