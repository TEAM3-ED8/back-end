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
exports.deleteOrganization = exports.updateOrganization = exports.createOrganization = exports.getByIdOrganization = exports.getAllOrganizations = void 0;
const prisma_1 = require("../prisma");
const utilities_1 = require("../utilities");
const getAllOrganizations = () => __awaiter(void 0, void 0, void 0, function* () {
    const allOrganizations = yield prisma_1.prisma.reindeerOrganizations.findMany({
        include: { positions: true }
    });
    return allOrganizations;
});
exports.getAllOrganizations = getAllOrganizations;
const getByIdOrganization = (_a) => __awaiter(void 0, [_a], void 0, function* ({ id }) {
    const organization = yield prisma_1.prisma.reindeerOrganizations.findUnique({
        where: { id },
        include: { positions: true }
    });
    if (!organization)
        throw new utilities_1.ClientError("Organization not found", 404, "No Organization found with the given ID");
    return organization;
});
exports.getByIdOrganization = getByIdOrganization;
const createOrganization = (organization) => __awaiter(void 0, void 0, void 0, function* () {
    const newOrganization = yield prisma_1.prisma.reindeerOrganizations.create({
        data: {
            name: organization.name,
            isSelected: organization.isSelected,
            isAvailable: organization.isAvailable,
            positions: {
                create: organization.positions
            }
        },
        include: { positions: true }
    });
    return newOrganization;
});
exports.createOrganization = createOrganization;
const updateOrganization = (id, organization) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, exports.getByIdOrganization)({ id });
    return yield prisma_1.prisma.reindeerOrganizations.update({
        where: { id },
        data: {
            name: organization.name,
            isSelected: organization.isSelected,
            isAvailable: organization.isAvailable,
            positions: {
                deleteMany: {},
                create: organization.positions.map(({ position, reindeerId }) => ({
                    position,
                    reindeerId
                }))
            }
        },
        include: { positions: true }
    });
});
exports.updateOrganization = updateOrganization;
const deleteOrganization = (_a) => __awaiter(void 0, [_a], void 0, function* ({ id }) {
    yield (0, exports.getByIdOrganization)({ id });
    yield prisma_1.prisma.positions.deleteMany({ where: { organizationId: id } });
    return prisma_1.prisma.reindeerOrganizations.delete({ where: { id } });
});
exports.deleteOrganization = deleteOrganization;
