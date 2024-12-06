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
const ReindeerOrganizationModel_1 = require("../models/ReindeerOrganizationModel");
const utilities_1 = require("../utilities");
exports.getAll = (0, utilities_1.catchedAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allOrganizations = yield (0, ReindeerOrganizationModel_1.getAllOrganizations)();
    (0, utilities_1.dataResponse)(res, 200, allOrganizations, "Successfully obtained organizations.");
}));
exports.getById = (0, utilities_1.catchedAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (id && isNaN(Number(id))) {
        throw new utilities_1.ClientError("Invalid ID", 400, "The ID must be a Number.");
    }
    const organization = yield (0, ReindeerOrganizationModel_1.getByIdOrganization)({
        id: Number(id)
    });
    (0, utilities_1.dataResponse)(res, 200, organization, "Organization successfully obtained.");
}));
exports.create = (0, utilities_1.catchedAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, isSelected, isAvailable, positions } = req.body;
    if (!name || !positions) {
        throw new utilities_1.ClientError("All fields are required", 400, "Missing required fields");
    }
    const organization = {
        name,
        isAvailable: isAvailable !== null && isAvailable !== void 0 ? isAvailable : false,
        isSelected: isSelected !== null && isSelected !== void 0 ? isSelected : false,
        positions
    };
    const createdOrganization = yield (0, ReindeerOrganizationModel_1.createOrganization)(organization);
    (0, utilities_1.dataResponse)(res, 201, createdOrganization, "Organization created successfully.");
}));
exports.update = (0, utilities_1.catchedAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (id && isNaN(Number(id))) {
        throw new utilities_1.ClientError("Invalid ID", 400, "ID must be a Number");
    }
    const { name, isSelected, isAvailable, positions } = req.body;
    if (!name || !positions) {
        throw new utilities_1.ClientError("All fields are required", 400, "Missing required fields");
    }
    const organization = {
        name,
        isAvailable: isAvailable !== null && isAvailable !== void 0 ? isAvailable : false,
        isSelected: isSelected !== null && isSelected !== void 0 ? isSelected : false,
        positions
    };
    const updatedOrganization = yield (0, ReindeerOrganizationModel_1.updateOrganization)(Number(id), organization);
    (0, utilities_1.dataResponse)(res, 200, updatedOrganization, "Organization updated successfully.");
}));
exports.remove = (0, utilities_1.catchedAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (id && isNaN(Number(id))) {
        throw new utilities_1.ClientError("Invalid ID", 400, "ID must be a Number");
    }
    const organizationFound = yield (0, ReindeerOrganizationModel_1.getByIdOrganization)({ id: Number(id) });
    if (!organizationFound)
        throw new utilities_1.ClientError("Organization not found", 404, "An Organization with the provided ID was not found.");
    const deletedOrganization = yield (0, ReindeerOrganizationModel_1.deleteOrganization)({ id: Number(id) });
    (0, utilities_1.dataResponse)(res, 200, deletedOrganization, "Organization deleted successfully.");
}));
