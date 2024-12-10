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
exports.getCookieStats = exports.consumeCookies = exports.deleteCookie = exports.updateCookie = exports.createCookie = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createCookie = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.cookie.create({
        data: Object.assign(Object.assign({}, data), { santa: {
                connect: { id: 1 }
            } })
    });
});
exports.createCookie = createCookie;
const updateCookie = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const cookie = yield prisma.cookie.findUnique({
        where: { id }
    });
    if (!cookie) {
        throw new Error("Galleta no encontrada");
    }
    return yield prisma.cookie.update({
        where: { id },
        data
    });
});
exports.updateCookie = updateCookie;
const deleteCookie = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const cookie = yield prisma.cookie.findUnique({
        where: { id }
    });
    if (!cookie) {
        throw new Error("Galleta no encontrada");
    }
    return yield prisma.cookie.delete({
        where: { id }
    });
});
exports.deleteCookie = deleteCookie;
const consumeCookies = (cookieId, amount) => __awaiter(void 0, void 0, void 0, function* () {
    const cookie = yield prisma.cookie.findUnique({
        where: { id: cookieId }
    });
    if (!cookie || cookie.quantity < amount) {
        throw new Error("Galletas insuficientes");
    }
    const totalCaloriesConsumed = cookie.calories * amount;
    return yield prisma.$transaction([
        prisma.cookie.update({
            where: { id: cookieId },
            data: {
                quantity: { decrement: amount },
                consumed: { increment: amount },
                totalCalories: { increment: totalCaloriesConsumed }
            }
        }),
        prisma.santaCalories.update({
            where: { id: 1 },
            data: {
                totalCookies: { increment: amount },
                totalConsumed: { increment: amount },
                totalCalories: { increment: totalCaloriesConsumed }
            }
        })
    ]);
});
exports.consumeCookies = consumeCookies;
const getCookieStats = () => __awaiter(void 0, void 0, void 0, function* () {
    const cookies = yield prisma.cookie.findMany();
    return {
        availableCookies: cookies.reduce((sum, cookie) => sum + cookie.quantity, 0),
        consumedCookies: cookies.reduce((sum, cookie) => sum + (cookie.consumed || 0), 0),
        totalCalories: cookies.reduce((sum, cookie) => sum + (cookie.totalCalories || 0), 0)
    };
});
exports.getCookieStats = getCookieStats;
