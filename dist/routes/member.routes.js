"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMemberRouter = void 0;
const express_1 = require("express");
const MembersController_1 = require("../controllers/MembersController");
/**
 * @swagger
 * tags:
 *   name: Members
 *   description: API endpoints for managing members
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Member:
 *       type: object
 *       required:
 *         - name
 *         - image
 *         - role
 *         - message
 *         - github
 *         - linkedin
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the member
 *         name:
 *           type: string
 *           description: The name of the member
 *         image:
 *           type: string
 *           description: The image URL of the member
 *         role:
 *           type: string
 *           description: The role of the member
 *         message:
 *           type: string
 *           description: A message from the member
 *         github:
 *           type: string
 *           description: The GitHub profile URL of the member
 *         linkedin:
 *           type: string
 *           description: The LinkedIn profile URL of the member
 */
const createMemberRouter = () => {
    const router = (0, express_1.Router)();
    /**
     * @swagger
     * /api/member:
     *   get:
     *     summary: Retrieve all members
     *     tags: [Members]
     *     responses:
     *       200:
     *         description: A list of members
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Member'
     */
    router.get("/", MembersController_1.getAll);
    /**
     * @swagger
     * /api/member/{id}:
     *   get:
     *     summary: Get a member by id
     *     tags: [Members]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: The member data
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Member'
     *       404:
     *         description: Member not found
     */
    router.get("/:id", MembersController_1.getById);
    /**
     * @swagger
     * /api/member:
     *   post:
     *     summary: Create a new member
     *     tags: [Members]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Member'
     *     responses:
     *       201:
     *         description: The created member
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Member'
     */
    router.post("/", MembersController_1.create);
    return router;
};
exports.createMemberRouter = createMemberRouter;