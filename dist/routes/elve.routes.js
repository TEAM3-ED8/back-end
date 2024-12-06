"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createElveRouter = void 0;
const express_1 = require("express");
const ElvesController_1 = require("../controllers/ElvesController");
/**
 * @swagger
 * tags:
 *   name: Elves
 *   description: API endpoints for managing elves
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Elf:
 *       type: object
 *       required:
 *         - name
 *         - age
 *         - address
 *         - height
 *         - email
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the elf
 *         name:
 *           type: string
 *           description: The name of the elf
 *         age:
 *           type: string
 *           description: The age of the elf
 *         address:
 *           type: string
 *           description: The address of the elf
 *         height:
 *           type: string
 *           description: The height of the elf
 *         email:
 *           type: string
 *           description: The email of the elf
 *         isDeleted:
 *           type: boolean
 *           description: Whether the elf is deleted or not
 */
const createElveRouter = () => {
    const router = (0, express_1.Router)();
    /**
     * @swagger
     * /api/elfo:
     *   get:
     *     summary: Returns the list of all elves
     *     tags: [Elves]
     *     responses:
     *       200:
     *         description: The list of elves
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Elf'
     */
    router.get("/", ElvesController_1.getAll);
    /**
     * @swagger
     * /api/elfo:
     *   post:
     *     summary: Create a new elf
     *     tags: [Elves]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Elf'
     *     responses:
     *       200:
     *         description: The created elf.
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Elf'
     *       500:
     *         description: Some server error
     */
    router.post("/", ElvesController_1.create);
    /**
     * @swagger
     * /api/elfo/{id}:
     *   get:
     *     summary: Get the elf by id
     *     tags: [Elves]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: integer
     *         required: true
     *         description: The elf id
     *     responses:
     *       200:
     *         description: The elf description by id
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Elf'
     *       404:
     *         description: The elf was not found
     */
    router.get("/:id", ElvesController_1.getById);
    /**
     * @swagger
     * /api/elfo/{id}:
     *   put:
     *    summary: Update the elf by the id
     *    tags: [Elves]
     *    parameters:
     *      - in: path
     *        name: id
     *        schema:
     *          type: integer
     *        required: true
     *        description: The elf id
     *    requestBody:
     *      required: true
     *      content:
     *        application/json:
     *          schema:
     *            $ref: '#/components/schemas/Elf'
     *    responses:
     *      200:
     *        description: The elf was updated
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#/components/schemas/Elf'
     *      404:
     *        description: The elf was not found
     *      500:
     *        description: Some error happened
     */
    router.put("/:id", ElvesController_1.update);
    /**
     * @swagger
     * /api/elfo/{id}:
     *   patch:
     *    summary: Update the status of the elf by the id
     *    tags: [Elves]
     *    parameters:
     *      - in: path
     *        name: id
     *        schema:
     *          type: integer
     *        required: true
     *        description: The elf id
     *    requestBody:
     *      required: true
     *      content:
     *        application/json:
     *          schema:
     *            type: object
     *            properties:
     *              isDeleted:
     *                type: boolean
     *    responses:
     *      200:
     *        description: The elf status was updated
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#/components/schemas/Elf'
     *      404:
     *        description: The elf was not found
     *      500:
     *        description: Some error happened
     */
    router.patch("/:id", ElvesController_1.updateStatus);
    /**
     * @swagger
     * /api/elfo/{id}:
     *   delete:
     *     summary: Remove the elf by id
     *     tags: [Elves]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: integer
     *         required: true
     *         description: The elf id
     *     responses:
     *       200:
     *         description: The elf was deleted
     *       404:
     *         description: The elf was not found
     */
    router.delete("/:id", ElvesController_1.remove);
    return router;
};
exports.createElveRouter = createElveRouter;