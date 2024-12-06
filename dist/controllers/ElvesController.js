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
exports.updateStatus = exports.remove = exports.update = exports.create = exports.getById = exports.getAll = void 0;
const ElvesModel_1 = require("../models/ElvesModel");
const utilities_1 = require("../utilities");
exports.getAll = (0, utilities_1.catchedAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, sortBy, sortOrder, name } = req.query;
    if ((limit && isNaN(Number(limit))) || (page && isNaN(Number(page)))) {
        throw new utilities_1.ClientError("Invalid limit or page", 400, "Limit and page must be Numbers.");
    }
    const filter = {};
    if (typeof name === "string" && name.trim() !== "") {
        filter.name = name.trim();
    }
    const response = yield (0, ElvesModel_1.getAllElves)({
        page: Number(page) || 1,
        limit: Number(limit) || 10,
        sortBy: sortBy,
        sortOrder: sortOrder,
        filter
    });
    const { data, count, current_page, pages } = response;
    const pagination = {
        count,
        current_page,
        pages
    };
    (0, utilities_1.dataResponse)(res, 200, data, "Successfully obtained elves.", pagination);
}));
exports.getById = (0, utilities_1.catchedAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (id && isNaN(Number(id))) {
        throw new utilities_1.ClientError("Invalid ID", 400, "The ID must be a Number.");
    }
    const elve = yield (0, ElvesModel_1.getByIdElve)({ id: Number(id) });
    (0, utilities_1.dataResponse)(res, 200, elve, "Elf successfully obtained.");
}));
exports.create = (0, utilities_1.catchedAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const elve = req.body;
    const { name, age, address, height, email } = elve;
    if (!name || !age || !address || !height || !email)
        throw new utilities_1.ClientError("All fields are required", 400, "Missing required fields");
    const createdElfo = yield (0, ElvesModel_1.createElve)(elve);
    (0, utilities_1.dataResponse)(res, 201, createdElfo, "Elfo created successfully.");
}));
exports.update = (0, utilities_1.catchedAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (id && isNaN(Number(id))) {
        throw new utilities_1.ClientError("Invalid ID", 400, "ID must be a Number");
    }
    const elve = req.body;
    const { name, age, address, height, email } = elve;
    if (!name || !age || !address || !height || !email)
        throw new utilities_1.ClientError("All fields are required", 400, "Missing required fields");
    const updatedElfo = yield (0, ElvesModel_1.updateElve)(Number(id), elve);
    (0, utilities_1.dataResponse)(res, 200, updatedElfo, "Elfo updated successfully");
}));
exports.remove = (0, utilities_1.catchedAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (id && isNaN(Number(id))) {
        throw new utilities_1.ClientError("Invalid ID", 400, "ID must be a Number");
    }
    const elfFound = yield (0, ElvesModel_1.getByIdElve)({ id: Number(id) });
    if (!elfFound)
        throw new utilities_1.ClientError("Elf not found", 404, "An elf with the provided ID was not found.");
    const elfRemoved = yield (0, ElvesModel_1.deleteElve)({
        id: Number(id),
        currentValue: elfFound.isDeleted
    });
    (0, utilities_1.dataResponse)(res, 200, elfRemoved, "Elf deleted successfully");
}));
exports.updateStatus = (0, utilities_1.catchedAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { isDeleted } = req.body;
    if (id && isNaN(Number(id)))
        throw new utilities_1.ClientError("Invalid ID", 400, "ID must be a Number");
    if (typeof isDeleted !== "boolean") {
        throw new utilities_1.ClientError("Invalid isDeleted value", 400, "isDeleted must be a boolean");
    }
    const updatedElve = yield (0, ElvesModel_1.updateElveStatus)(Number(id), isDeleted);
    (0, utilities_1.dataResponse)(res, 200, updatedElve, "Elf status updated successfully");
}));
