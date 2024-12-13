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
exports.deleteReindeerAndUpdateOrganizations = exports.getIncludesID = exports.deleteReindeer = exports.updateReindeer = exports.createReindeer = exports.getByIdReindeer = exports.getAllReindeer = void 0;
const prisma_1 = require("../prisma");
const utilities_1 = require("../utilities");
const getAllReindeer = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.prisma.reindeers.findMany({
        include: { skills: true }
    });
});
exports.getAllReindeer = getAllReindeer;
const getByIdReindeer = (_a) => __awaiter(void 0, [_a], void 0, function* ({ id }) {
    const reindeer = yield prisma_1.prisma.reindeers.findUnique({
        where: { id },
        include: { skills: true }
    });
    if (!reindeer)
        throw new utilities_1.ClientError("Reindeer not found", 404, "No Reindeer found with the given ID");
    return reindeer;
});
exports.getByIdReindeer = getByIdReindeer;
const createReindeer = (reindeer) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.prisma.reindeers.create({
        data: {
            name: reindeer.name,
            type: reindeer.type,
            skills: {
                create: reindeer.skills
            }
        },
        include: { skills: true }
    });
});
exports.createReindeer = createReindeer;
const updateReindeer = (id, reindeer) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, type, skills } = reindeer;
    yield (0, exports.getByIdReindeer)({ id });
    return yield prisma_1.prisma.reindeers.update({
        where: { id },
        data: {
            name,
            type,
            skills: {
                deleteMany: {},
                create: skills
            }
        },
        include: { skills: true }
    });
});
exports.updateReindeer = updateReindeer;
const deleteReindeer = (_a) => __awaiter(void 0, [_a], void 0, function* ({ id }) {
    yield (0, exports.getByIdReindeer)({ id });
    // search organizations with reindeer
    const organizationsWithReindeer = yield prisma_1.prisma.reindeerOrganizations.findMany({
        where: {
            positions: {
                some: {
                    reindeerId: id
                }
            }
        }
    });
    // Update Organizations
    for (const org of organizationsWithReindeer) {
        yield prisma_1.prisma.reindeerOrganizations.update({
            where: { id: org.id },
            data: {
                isAvailable: false,
                isSelected: false,
                positions: {
                    updateMany: {
                        where: { reindeerId: id },
                        data: { reindeerId: null }
                    }
                }
            }
        });
    }
    // Delete Skills
    yield prisma_1.prisma.skills.deleteMany({ where: { reindeerId: id } });
    //  Delete Reindeer
    return yield prisma_1.prisma.reindeers.delete({
        where: { id }
    });
});
exports.deleteReindeer = deleteReindeer;
const getIncludesID = (_a) => __awaiter(void 0, [_a], void 0, function* ({ ids }) {
    return yield prisma_1.prisma.reindeers.findMany({ where: { id: { in: ids } } });
});
exports.getIncludesID = getIncludesID;
exports.deleteReindeerAndUpdateOrganizations = exports.deleteReindeer;
