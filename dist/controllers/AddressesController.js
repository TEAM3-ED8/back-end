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
exports.remove = exports.update = exports.create = exports.getByDate = exports.getById = exports.getAll = void 0;
const utilities_1 = require("../utilities");
const AddressesModel_1 = require("./../models/AddressesModel");
const prisma_1 = require("../prisma");
exports.getAll = (0, utilities_1.catchedAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit } = req.query;
    if (limit && isNaN(Number(limit))) {
        throw new utilities_1.ClientError("Invalid limit", 400, "Limit must be a Number.");
    }
    let allAddresses = [];
    if (limit) {
        allAddresses = yield (0, AddressesModel_1.filterLatestSearches)({ limit: Number(limit) });
    }
    else {
        allAddresses = yield prisma_1.prisma.addresses.findMany();
    }
    (0, utilities_1.dataResponse)(res, 200, allAddresses, "Addresses obtained successfully");
}));
exports.getById = (0, utilities_1.catchedAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (id && isNaN(Number(id))) {
        throw new utilities_1.ClientError("Invalid ID", 400, "The ID must be a Number.");
    }
    const address = yield (0, AddressesModel_1.getByIdAddress)({ id: Number(id) });
    (0, utilities_1.dataResponse)(res, 200, address, "Address successfully obtained.");
}));
exports.getByDate = (0, utilities_1.catchedAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { search_date } = req.params;
    if (!search_date || search_date.trim().length === 0) {
        throw new utilities_1.ClientError("Invalid date", 400, "The date must be a string.");
    }
    const date = new Date(search_date);
    if (isNaN(date.getTime())) {
        throw new utilities_1.ClientError("Invalid date format", 400, "The date must be a valid ISO 8601 string.");
    }
    const address = yield (0, AddressesModel_1.filterBySearchDate)({ searchDate: date });
    (0, utilities_1.dataResponse)(res, 200, address, "Address obtained by date successfully.");
}));
exports.create = (0, utilities_1.catchedAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { lat, lng, display_name } = req.body;
    if (!lat || !lng || !display_name) {
        throw new utilities_1.ClientError("All fields are required", 400, "Missing required fields");
    }
    if (typeof lat !== "number" || typeof lng !== "number") {
        throw new utilities_1.ClientError("Invalid coordinates", 400, "Latitude and longitude must be numbers");
    }
    try {
        const createdAddress = yield (0, AddressesModel_1.createAddress)({ lat: lat.toString(), lng: lng.toString(), display_name });
        (0, utilities_1.dataResponse)(res, 201, createdAddress, "Address created successfully");
    }
    catch (error) {
        if (error instanceof utilities_1.ClientError) {
            throw error;
        }
        throw new utilities_1.ServerError("Failed to create address", 500, "An unexpected error occurred while creating the address");
    }
}));
exports.update = (0, utilities_1.catchedAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (id && isNaN(Number(id)))
        throw new utilities_1.ClientError("Invalid ID", 400, "ID must be a Number");
    const address = req.body;
    if (!address.lat ||
        !address.lng ||
        !address.display_name ||
        !address.search_date) {
        throw new utilities_1.ClientError("All fields are required", 400, "Missing required fields");
    }
    const updatedAddress = yield (0, AddressesModel_1.updateAddress)(Number(id), address);
    (0, utilities_1.dataResponse)(res, 200, updatedAddress, "Address updated successfully");
}));
exports.remove = (0, utilities_1.catchedAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (id && isNaN(Number(id)))
        throw new utilities_1.ClientError("Invalid ID", 400, "ID must be a Number");
    const deletedAddress = yield (0, AddressesModel_1.deleteAddress)({ id: Number(id) });
    (0, utilities_1.dataResponse)(res, 200, deletedAddress, "Address deleted successfully");
}));
