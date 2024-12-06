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
exports.updateStatus = exports.update = exports.create = exports.getById = exports.getAll = void 0;
const CardModel_1 = require("../models/CardModel");
const utilities_1 = require("../utilities");
const CardModel_2 = require("./../models/CardModel");
exports.getAll = (0, utilities_1.catchedAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allCards = yield (0, CardModel_1.getAllCards)();
    (0, utilities_1.dataResponse)(res, 200, allCards, "Cards obtained successfully");
}));
exports.getById = (0, utilities_1.catchedAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    if (id && isNaN(Number(id))) {
        throw new utilities_1.ClientError("Invalid ID", 400, "The ID must be a Number");
    }
    const card = yield (0, CardModel_1.getByIdCard)({ id: Number(id) });
    (0, utilities_1.dataResponse)(res, 200, card, "Card successfully obtained.");
}));
exports.create = (0, utilities_1.catchedAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const card = req.body;
    if (!card.content || !card.children_id) {
        throw new utilities_1.ClientError("All fields are required", 400, "Missing required fields");
    }
    const createdCard = yield (0, CardModel_1.createCard)(card);
    (0, utilities_1.dataResponse)(res, 201, createdCard, "Card created successfully");
}));
exports.update = (0, utilities_1.catchedAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (id && isNaN(Number(id)))
        throw new utilities_1.ClientError("Invalid ID", 400, "ID must be a Number");
    const card = req.body;
    if (!card.content || !card.children_id) {
        throw new utilities_1.ClientError("All fields are required", 400, "Missing required fields");
    }
    const updatedCard = yield (0, CardModel_2.updateCard)(Number(id), card);
    (0, utilities_1.dataResponse)(res, 200, updatedCard, "Address updated successfully");
}));
exports.updateStatus = (0, utilities_1.catchedAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { isRead } = req.body;
    if (id && isNaN(Number(id)))
        throw new utilities_1.ClientError("Invalid ID", 400, "ID must be a Number");
    if (typeof isRead !== 'boolean') {
        throw new utilities_1.ClientError("Invalid isRead value", 400, "isRead must be a boolean");
    }
    const updatedCard = yield (0, CardModel_1.updateCardStatus)(Number(id), isRead);
    (0, utilities_1.dataResponse)(res, 200, updatedCard, "Card status updated successfully");
}));
