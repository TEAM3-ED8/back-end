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
exports.filterBySearchDate = exports.filterLatestSearches = exports.deleteAddress = exports.updateAddress = exports.createAddress = exports.getByIdAddress = exports.getAllAddress = void 0;
const prisma_1 = require("../prisma");
const errors_1 = require("../utilities/errors");
const getAllAddress = () => __awaiter(void 0, void 0, void 0, function* () {
    const addresses = yield prisma_1.prisma.addresses.findMany();
    return addresses;
});
exports.getAllAddress = getAllAddress;
const getByIdAddress = (_a) => __awaiter(void 0, [_a], void 0, function* ({ id }) {
    const address = yield prisma_1.prisma.addresses.findUnique({ where: { id } });
    if (!address)
        throw new errors_1.ClientError("Address not found", 404, "No Address found with the given ID");
    return address;
});
exports.getByIdAddress = getByIdAddress;
const createAddress = (address) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.prisma.addresses.create({
        data: Object.assign(Object.assign({}, address), { lat: address.lat.toString(), lng: address.lng.toString() })
    });
});
exports.createAddress = createAddress;
const updateAddress = (id, address) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, exports.getByIdAddress)({ id });
    return yield prisma_1.prisma.addresses.update({
        where: { id },
        data: address
    });
});
exports.updateAddress = updateAddress;
const deleteAddress = (_a) => __awaiter(void 0, [_a], void 0, function* ({ id }) {
    yield (0, exports.getByIdAddress)({ id });
    return yield prisma_1.prisma.addresses.delete({ where: { id } });
});
exports.deleteAddress = deleteAddress;
const filterLatestSearches = (_a) => __awaiter(void 0, [_a], void 0, function* ({ limit }) {
    return yield prisma_1.prisma.addresses.findMany({
        select: {
            id: true,
            lat: true,
            lng: true,
            display_name: true,
            search_date: true
        },
        orderBy: { search_date: "desc" },
        take: limit
    });
});
exports.filterLatestSearches = filterLatestSearches;
const filterBySearchDate = (_a) => __awaiter(void 0, [_a], void 0, function* ({ searchDate }) {
    const address = (yield prisma_1.prisma.addresses.findFirst({
        select: {
            id: true,
            lat: true,
            lng: true,
            display_name: true,
            search_date: true
        },
        where: {
            search_date: searchDate
        }
    })) || null;
    if (!address)
        throw new errors_1.ClientError("Address not found", 404, "No Address found with the date provided");
    return address;
});
exports.filterBySearchDate = filterBySearchDate;
