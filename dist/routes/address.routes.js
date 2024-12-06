"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAddressRouter = void 0;
const express_1 = require("express");
const AddressesController_1 = require("../controllers/AddressesController");
/**
 * @swagger
 * tags:
 *   name: Addresses
 *   description: API endpoints for managing addresses
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Address:
 *       type: object
 *       required:
 *         - lat
 *         - lng
 *         - display_name
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the address
 *         lat:
 *           type: string
 *           description: The latitude of the address
 *         lng:
 *           type: string
 *           description: The longitude of the address
 *         display_name:
 *           type: string
 *           description: The display name of the address
 *         search_date:
 *           type: string
 *           format: date-time
 *           description: The date when the address was searched
 */
const createAddressRouter = () => {
    const router = (0, express_1.Router)();
    /**
     * @swagger
     * /api/address:
     *   get:
     *     summary: Retrieve all addresses
     *     tags: [Addresses]
     *     responses:
     *       200:
     *         description: A list of addresses
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Address'
     */
    router.get("/", AddressesController_1.getAll);
    /**
     * @swagger
     * /api/address/{id}:
     *   get:
     *     summary: Get an address by id
     *     tags: [Addresses]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: The address data
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Address'
     *       404:
     *         description: Address not found
     */
    router.get("/:id", AddressesController_1.getById);
    /**
     * @swagger
     * /api/address:
     *   post:
     *     summary: Create a new address
     *     tags: [Addresses]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Address'
     *     responses:
     *       201:
     *         description: The created address
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Address'
     */
    router.post("/", AddressesController_1.create);
    /**
     * @swagger
     * /api/address/{id}:
     *   put:
     *     summary: Update an address
     *     tags: [Addresses]
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
     *             $ref: '#/components/schemas/Address'
     *     responses:
     *       200:
     *         description: The updated address
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Address'
     *       404:
     *         description: Address not found
     */
    router.put("/:id", AddressesController_1.update);
    /**
     * @swagger
     * /api/address/{id}:
     *   delete:
     *     summary: Delete an address
     *     tags: [Addresses]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: Address successfully deleted
     *       404:
     *         description: Address not found
     */
    router.delete("/:id", AddressesController_1.remove);
    /**
     * @swagger
     * /api/address/search/{search_date}:
     *   get:
     *     summary: Get addresses by search date
     *     tags: [Addresses]
     *     parameters:
     *       - in: path
     *         name: search_date
     *         required: true
     *         schema:
     *           type: string
     *           format: date
     *     responses:
     *       200:
     *         description: List of addresses for the given search date
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Address'
     */
    router.get("/search/:search_date", AddressesController_1.getByDate);
    return router;
};
exports.createAddressRouter = createAddressRouter;
