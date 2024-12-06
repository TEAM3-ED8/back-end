"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createChildrensRouter = void 0;
const express_1 = require("express");
const ChildrensController_1 = require("../controllers/ChildrensController");
const createChildrensRouter = () => {
    const router = (0, express_1.Router)();
    router.post("/", ChildrensController_1.create);
    router.get("/", ChildrensController_1.getAll);
    // router.delete("/:id", remove)
    router.put("/:id", ChildrensController_1.update);
    return router;
};
exports.createChildrensRouter = createChildrensRouter;
