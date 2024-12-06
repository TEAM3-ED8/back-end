"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSantaCookiesRouter = void 0;
const express_1 = require("express");
const SantaCookiesController_1 = require("../controllers/SantaCookiesController");
const createSantaCookiesRouter = () => {
    const router = (0, express_1.Router)();
    router.get("/", SantaCookiesController_1.getAllCookies);
    router.post("/", SantaCookiesController_1.create);
    router.get("/stats", SantaCookiesController_1.getStats);
    router.post("/consume", SantaCookiesController_1.consume);
    return router;
};
exports.createSantaCookiesRouter = createSantaCookiesRouter;
