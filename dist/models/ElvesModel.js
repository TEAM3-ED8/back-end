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
exports.updateElveStatus = exports.deleteElve = exports.updateElve = exports.getAllElves = exports.getByIdElve = exports.createElve = void 0;
const prisma_1 = require("../prisma");
const utilities_1 = require("../utilities");
const createElve = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.prisma.elves.create({ data });
});
exports.createElve = createElve;
const getByIdElve = (_a) => __awaiter(void 0, [_a], void 0, function* ({ id }) {
    const elve = yield prisma_1.prisma.elves.findUnique({ where: { id } });
    if (!elve)
        throw new utilities_1.ClientError("Elve not found", 404, "No Elve found with the given ID");
    return elve;
});
exports.getByIdElve = getByIdElve;
const getAllElves = (_a) => __awaiter(void 0, [_a], void 0, function* ({ page = 1, limit = 10, sortBy = "id", sortOrder = "asc", filter = {} }) {
    const where = {};
    if (filter.name) {
        where.name = {
            contains: filter.name,
            mode: "insensitive"
        };
    }
    const totalItems = yield prisma_1.prisma.elves.count({ where });
    const totalPages = Math.max(1, Math.ceil(totalItems / limit));
    const safePageNumber = Math.max(1, Math.min(page, totalPages));
    const response = yield prisma_1.prisma.elves.findMany({
        where,
        skip: (safePageNumber - 1) * limit,
        take: limit,
        orderBy: { [sortBy]: sortOrder }
    });
    return {
        data: response,
        count: totalItems,
        current_page: safePageNumber,
        pages: totalPages
    };
});
exports.getAllElves = getAllElves;
const updateElve = (id, elve) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, exports.getByIdElve)({ id });
    return yield prisma_1.prisma.elves.update({
        where: { id },
        data: elve
    });
});
exports.updateElve = updateElve;
const deleteElve = (_a) => __awaiter(void 0, [_a], void 0, function* ({ id, currentValue }) {
    const elfFound = yield (0, exports.getByIdElve)({ id });
    if (!elfFound) {
        throw new utilities_1.ClientError("Elf not found", 404, "No elf found with the provided ID.");
    }
    try {
        return yield prisma_1.prisma.elves.update({
            where: { id },
            data: {
                isDeleted: !currentValue
            }
        });
    }
    catch (error) {
        throw new utilities_1.ServerError("Failed to delete elf", 500, "An error occurred during the deletion process.");
    }
});
exports.deleteElve = deleteElve;
const updateElveStatus = (id, isDeleted) => __awaiter(void 0, void 0, void 0, function* () {
    const elfFound = yield (0, exports.getByIdElve)({ id });
    if (!elfFound) {
        throw new utilities_1.ClientError("Elve not found", 404, "No elve found with the provided ID.");
    }
    try {
        return yield prisma_1.prisma.elves.update({
            where: { id },
            data: { isDeleted }
        });
    }
    catch (error) {
        throw new utilities_1.ServerError("Failed to update elve status", 500, "An error occurred during the status update process.");
    }
});
exports.updateElveStatus = updateElveStatus;
