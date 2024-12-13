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
exports.create = exports.getById = exports.getAll = void 0;
const MembersModel_1 = require("../models/MembersModel");
const data_response_1 = require("../utilities/data-response");
const catchedAsync_1 = require("../utilities/catchedAsync");
const errors_1 = require("../utilities/errors");
exports.getAll = (0, catchedAsync_1.catchedAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allMembers = yield (0, MembersModel_1.getAllMembers)();
    (0, data_response_1.dataResponse)(res, 200, allMembers, "Members obtained successfully");
}));
exports.getById = (0, catchedAsync_1.catchedAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (id && isNaN(Number(id))) {
        throw new errors_1.ClientError("Invalid ID", 400, "The ID must be a Number.");
    }
    const member = yield (0, MembersModel_1.getMemberById)({ id: Number(id) });
    (0, data_response_1.dataResponse)(res, 200, member, "Member successfully obtained");
}));
exports.create = (0, catchedAsync_1.catchedAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const member = req.body;
    if (!member.name || !member.role || !member.message || !member.github) {
        throw new errors_1.ClientError("All fields are required", 400, "Missing required fields");
    }
    const createdMember = yield (0, MembersModel_1.createMember)(member);
    (0, data_response_1.dataResponse)(res, 201, createdMember, "Member created successfully");
}));
