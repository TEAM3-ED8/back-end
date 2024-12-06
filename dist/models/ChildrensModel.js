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
exports.updateChildrens = exports.deleteChildren = exports.getAllChildrens = exports.createChildren = exports.isValidLevelBehavior = exports.isValidBehavior = exports.LevelBehavior = exports.Behavior = void 0;
const prisma_1 = require("../prisma");
var Behavior;
(function (Behavior) {
    Behavior["Kind"] = "Kind";
    Behavior["Lazy"] = "Lazy";
    Behavior["Respectful"] = "Respectful";
    Behavior["Curious"] = "Curious";
    Behavior["Helpful"] = "Helpful";
})(Behavior || (exports.Behavior = Behavior = {}));
var LevelBehavior;
(function (LevelBehavior) {
    LevelBehavior["Good"] = "Good";
    LevelBehavior["Regular"] = "Regular";
    LevelBehavior["Bad"] = "Bad";
})(LevelBehavior || (exports.LevelBehavior = LevelBehavior = {}));
const isValidBehavior = (behavior) => {
    return Object.values(Behavior).includes(behavior);
};
exports.isValidBehavior = isValidBehavior;
const isValidLevelBehavior = (level) => {
    return Object.values(LevelBehavior).includes(level);
};
exports.isValidLevelBehavior = isValidLevelBehavior;
const createChildren = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.prisma.childrens.create({ data });
});
exports.createChildren = createChildren;
const getAllChildrens = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.prisma.childrens.findMany();
});
exports.getAllChildrens = getAllChildrens;
const deleteChildren = (_a) => __awaiter(void 0, [_a], void 0, function* ({ id, currentValue }) {
    return yield prisma_1.prisma.childrens.update({
        where: { id },
        data: {
            gift: !currentValue
        }
    });
});
exports.deleteChildren = deleteChildren;
const updateChildrens = (_a) => __awaiter(void 0, [_a], void 0, function* ({ id, data }) {
    return yield prisma_1.prisma.childrens.update({
        where: { id },
        data
    });
});
exports.updateChildrens = updateChildrens;
