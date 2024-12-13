"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createReindeerOrganizationRouter = void 0;
const express_1 = require("express");
const ReindeerOrganizationController_1 = require("../controllers/ReindeerOrganizationController");
/**
 * @swagger
 * tags:
 *   name: ReindeerOrganization
 *   description: API endpoints for managing reindeer organizations
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     ReindeerOrganization:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the reindeer organization
 *         name:
 *           type: string
 *           description: The name of the reindeer organization
 */
const createReindeerOrganizationRouter = () => {
    const router = (0, express_1.Router)();
    /**
     * @swagger
     * /api/reindeerOrganizations:
     *   get:
     *     summary: Retrieve all reindeer organizations
     *     tags: [ReindeerOrganization]
     *     responses:
     *       200:
     *         description: A list of reindeer organizations
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/ReindeerOrganization'
     */
    router.get("/", ReindeerOrganizationController_1.getAll);
    /**
     * @swagger
     * /api/reindeerOrganizations:
     *    get:
     *     summary: Get a reindeer organization by id
     *     tags: [ReindeerOrganization]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: The reindeer organization data
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/ReindeerOrganization'
     *       404:
     *         description: Reindeer organization not found
     */
    router.get("/:id", ReindeerOrganizationController_1.getById);
    /**
     * @swagger
     * /api/reindeerOrganizations:
     *   post:
     *     summary: Create a new reindeer organization
     *     tags: [ReindeerOrganization]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/ReindeerOrganization'
     *     responses:
     *       201:
     *         description: The created reindeer organization
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/ReindeerOrganization'
     */
    router.post("/", ReindeerOrganizationController_1.create);
    /**
     * @swagger
     * /api/reindeerOrganizations:
     *     put:
     *     summary: Update a reindeer organization
     *     tags: [ReindeerOrganization]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/ReindeerOrganization'
     *     responses:
     *       200:
     *         description: The updated reindeer organization
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/ReindeerOrganization'
     *       404:
     *         description: Reindeer organization not found
     */
    router.put("/:id", ReindeerOrganizationController_1.update);
    /**
     * @swagger
     * /api/reindeerOrganizations:
     *     delete:
     *     summary: Delete a reindeer organization
     *     tags: [ReindeerOrganization]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: Reindeer organization successfully deleted
     *       404:
     *         description: Reindeer organization not found
     */
    router.delete("/:id", ReindeerOrganizationController_1.remove);
    return router;
};
exports.createReindeerOrganizationRouter = createReindeerOrganizationRouter;
