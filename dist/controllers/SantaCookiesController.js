"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCookies = exports.getStats = exports.consume = exports.create = void 0;
const SantaCookiesModel_1 = require("./../models/SantaCookiesModel");
const utilities_1 = require("../utilities");
const prisma_1 = require("../prisma");
exports.create = (0, utilities_1.catchedAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, calories, quantity, consumed, totalCalories } = req.body;
    if (!name || !calories || !quantity) {
        res.status(400).json({
            error: "Nombre, calorías y cantidad son requeridos"
        });
        return;
    }
    try {
        const newCookie = yield (0, SantaCookiesModel_1.createCookie)({
            name,
            calories,
            quantity,
            consumed,
            totalCalories
        });
        res.status(201).json({
            message: "Galleta creada exitosamente",
            data: newCookie
        });
    }
    catch (error) {
        next(error);
    }
}));
exports.consume = (0, utilities_1.catchedAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { cookieId, amount } = req.body;
    if (!cookieId || !amount) {
        res.status(400).json({
            error: "cookieId y amount son requeridos"
        });
        return;
    }
    try {
        const [updatedCookie] = yield (0, SantaCookiesModel_1.consumeCookies)(cookieId, amount);
        res.status(200).json({
            message: "Galletas consumidas exitosamente",
            data: updatedCookie
        });
    }
    catch (error) {
        if (error instanceof Error && error.message === "Galletas insuficientes") {
            res.status(400).json({
                error: error.message
            });
            return;
        }
        next(error);
    }
}));
exports.getStats = (0, utilities_1.catchedAsync)((_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const stats = yield (0, SantaCookiesModel_1.getCookieStats)();
        res.status(200).json({
            message: "Estadísticas obtenidas exitosamente",
            data: stats
        });
    }
    catch (error) {
        next(error);
    }
}));
exports.getAllCookies = (0, utilities_1.catchedAsync)((_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cookies = yield prisma_1.prisma.cookie.findMany({
            include: {
                santa: true
            }
        });
        res.status(200).json({
            message: "Galletas obtenidas exitosamente",
            data: cookies
        });
    }
    catch (error) {
        next(error);
    }
}));