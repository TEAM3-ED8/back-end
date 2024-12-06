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
exports.remove = exports.update = exports.create = exports.getById = exports.getAll = void 0;
const ReindeerModel_1 = require("../models/ReindeerModel");
const utilities_1 = require("../utilities");
exports.getAll = (0, utilities_1.catchedAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allReindeers = yield (0, ReindeerModel_1.getAllReindeer)();
    (0, utilities_1.dataResponse)(res, 200, allReindeers, "Reindeers obtained successfully");
}));
exports.getById = (0, utilities_1.catchedAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (id && isNaN(Number(id))) {
        throw new utilities_1.ClientError("Invalid ID", 400, "The ID must be a Number.");
    }
    const reindeer = yield (0, ReindeerModel_1.getByIdReineer)({ id: Number(id) });
    (0, utilities_1.dataResponse)(res, 200, reindeer, "Reindeer successfully obtained");
}));
exports.create = (0, utilities_1.catchedAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, type, skills } = req.body;
    if (!name || !type || !skills)
        throw new utilities_1.ClientError("All fields are required", 400, "Missing required fields");
    const reindeer = {
        name,
        type,
        skills
    };
    const createdReindeer = yield (0, ReindeerModel_1.createReindeer)(reindeer);
    (0, utilities_1.dataResponse)(res, 201, createdReindeer, "Reindeer created successfully");
}));
exports.update = (0, utilities_1.catchedAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (id && isNaN(Number(id))) {
        throw new utilities_1.ClientError("Invalid ID", 400, "The ID must be a Number.");
    }
    const { name, type, skills } = req.body;
    if (!name || !type || !skills)
        throw new utilities_1.ClientError("All fields are required", 400, "Missing required fields");
    const reindeer = {
        name,
        type,
        skills
    };
    const updatedReindeer = yield (0, ReindeerModel_1.updateReindeer)(Number(id), reindeer);
    (0, utilities_1.dataResponse)(res, 200, updatedReindeer, "Reindeer updated successfully");
}));
exports.remove = (0, utilities_1.catchedAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (id && isNaN(Number(id))) {
        throw new utilities_1.ClientError("Invalid ID", 400, "The ID must be a Number.");
    }
    const deletedReindeer = yield (0, ReindeerModel_1.deleteReindeer)({ id: Number(id) });
    (0, utilities_1.dataResponse)(res, 200, deletedReindeer, "Reindeer deleted successfully");
}));
