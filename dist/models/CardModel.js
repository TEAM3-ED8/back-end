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
exports.updateCardStatus = exports.updateCard = exports.getAllCards = exports.getByIdCard = exports.createCard = void 0;
const prisma_1 = require("../prisma");
const utilities_1 = require("../utilities");
const createCard = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.prisma.card.create({ data });
});
exports.createCard = createCard;
const getByIdCard = (_a) => __awaiter(void 0, [_a], void 0, function* ({ id }) {
    const card = yield prisma_1.prisma.card.findUnique({ where: { id } });
    if (!card)
        throw new utilities_1.ClientError("Card not found", 404, "No Card found with the given ID");
    return card;
});
exports.getByIdCard = getByIdCard;
const getAllCards = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.prisma.card.findMany({
        include: {
            children: true
        },
        orderBy: {
            isRead: "asc"
        }
    });
});
exports.getAllCards = getAllCards;
const updateCard = (id, card) => __awaiter(void 0, void 0, void 0, function* () {
    const foundCard = yield (0, exports.getByIdCard)({ id });
    return yield prisma_1.prisma.card.update({
        where: { id },
        data: card
    });
});
exports.updateCard = updateCard;
const updateCardStatus = (id, isRead) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.prisma.card.update({
        where: { id },
        data: { isRead }
    });
});
exports.updateCardStatus = updateCardStatus;
