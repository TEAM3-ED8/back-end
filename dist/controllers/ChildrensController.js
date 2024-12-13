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
exports.update = exports.create = exports.getAll = void 0;
const ChildrensModel_1 = require("../models/ChildrensModel");
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const childrens = yield (0, ChildrensModel_1.getAllChildrens)();
        res.json(childrens);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.getAll = getAll;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, behavior, levelBehavior, gift } = req.body;
        if (!name || gift === undefined) {
            res.status(404).json({ msg: "Name and gift are required" });
            return;
        }
        if (!(0, ChildrensModel_1.isValidBehavior)(behavior)) {
            res.status(400).json({
                msg: "Invalid behavior. Must be: Kind, Brave, Respectful, Curious or Helpful"
            });
            return;
        }
        if (!(0, ChildrensModel_1.isValidLevelBehavior)(levelBehavior)) {
            res.status(400).json({
                msg: "Invalid levelBehavior. Must be: Good, Regular or Bad"
            });
            return;
        }
        const childrenCreate = yield (0, ChildrensModel_1.createChildren)({
            name,
            behavior,
            levelBehavior,
            gift
        });
        res.json(childrenCreate);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.create = create;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            res.status(404).json({ msg: "Invalid ID" });
            return;
        }
        const { name, behavior, levelBehavior, gift } = req.body;
        if (!name || gift === undefined) {
            res.status(404).json({ msg: "Name and gift are required" });
            return;
        }
        if (!(0, ChildrensModel_1.isValidBehavior)(behavior)) {
            res.status(400).json({
                msg: "Invalid behavior. Must be: Kind, Brave, Respectful, Curious or Helpful"
            });
            return;
        }
        if (!(0, ChildrensModel_1.isValidLevelBehavior)(levelBehavior)) {
            res.status(400).json({
                msg: "Invalid levelBehavior. Must be: Good, Regular or Bad"
            });
            return;
        }
        const childrenUpdate = yield (0, ChildrensModel_1.updateChildrens)({
            id,
            data: {
                name,
                behavior,
                levelBehavior,
                gift
            }
        });
        res.json(childrenUpdate);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.update = update;
