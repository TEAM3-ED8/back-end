"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSantaCookiesRouter = void 0;
const express_1 = require("express");
const SantaCookiesController_1 = require("../controllers/SantaCookiesController");
/**
 * @swagger
 * tags:
 *   name: SantaCookies
 *   description: API endpoints for managing Santa's cookies
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     SantaCookie:
 *       type: object
 *       required:
 *         - type
 *         - quantity
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the cookie
 *         type:
 *           type: string
 *           description: The type of cookie
 *         quantity:
 *           type: integer
 *           description: The quantity of cookies
 */
const createSantaCookiesRouter = () => {
    const router = (0, express_1.Router)();
    /**
     * @swagger
     * /api/santaCookies:
     *   get:
     *     summary: Retrieve all Santa's cookies
     *     tags: [SantaCookies]
     *     responses:
     *       200:
     *         description: A list of Santa's cookies
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/SantaCookie'
     */
    router.get("/", SantaCookiesController_1.getAllCookies);
    /**
     * @swagger
     * /api/santaCookies:
     *   post:
     *     summary: Create a new cookie entry
     *     tags: [SantaCookies]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/SantaCookie'
     *     responses:
     *       201:
     *         description: The created cookie entry
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/SantaCookie'
     */
    router.post("/", SantaCookiesController_1.create);
    /**
     * @swagger
     * /api/santaCookies/stats:
     *   get:
     *     summary: Get statistics about Santa's cookies
     *     tags: [SantaCookies]
     *     responses:
     *       200:
     *         description: Cookie statistics
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 totalCookies:
     *                   type: integer
     *                 cookieTypes:
     *                   type: array
     *                   items:
     *                     type: string
     */
    router.get("/stats", SantaCookiesController_1.getStats);
    /**
     * @swagger
     * /api/santaCookies/consume:
     *   post:
     *     summary: Consume a certain amount of cookies
     *     tags: [SantaCookies]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - type
     *               - quantity
     *             properties:
     *               type:
     *                 type: string
     *               quantity:
     *                 type: integer
     *     responses:
     *       200:
     *         description: Cookies consumed successfully
     *       400:
     *         description: Not enough cookies available
     */
    router.post("/consume", SantaCookiesController_1.consume);
    return router;
};
exports.createSantaCookiesRouter = createSantaCookiesRouter;
