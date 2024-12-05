import { Router } from "express"
import { create, getAll, getById, update, updateStatus } from "../controllers/CardsController"

/**
 * @swagger
 * tags:
 *   name: Cards
 *   description: API endpoints for managing cards
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Card:
 *       type: object
 *       required:
 *         - content
 *         - children_id
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the card
 *         content:
 *           type: string
 *           description: The content of the card
 *         create_at:
 *           type: string
 *           format: date-time
 *           description: The creation date of the card
 *         children_id:
 *           type: integer
 *           description: The id of the associated child
 *         isRead:
 *           type: boolean
 *           description: Whether the card has been read or not
 */

export const createCardsRouter = () => {
  const router = Router()

  /**
   * @swagger
   * /api/card:
   *   post:
   *     summary: Create a new card
   *     tags: [Cards]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Card'
   *     responses:
   *       201:
   *         description: The created card
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Card'
   */
  router.post("/", create)

  /**
   * @swagger
   * /api/card:
   *   get:
   *     summary: Retrieve all cards
   *     tags: [Cards]
   *     responses:
   *       200:
   *         description: A list of cards
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Card'
   */
  router.get("/", getAll)

  /**
   * @swagger
   * /api/card/{id}:
   *   get:
   *     summary: Get a card by id
   *     tags: [Cards]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: The card data
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Card'
   *       404:
   *         description: Card not found
   */
  router.get("/:id", getById)

  /**
   * @swagger
   * /api/card/{id}:
   *   put:
   *     summary: Update a card
   *     tags: [Cards]
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
   *             $ref: '#/components/schemas/Card'
   *     responses:
   *       200:
   *         description: The updated card
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Card'
   *       404:
   *         description: Card not found
   */
  router.put("/:id", update)

  /**
   * @swagger
   * /api/card/{id}:
   *   patch:
   *     summary: Update card status
   *     tags: [Cards]
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
   *             type: object
   *             properties:
   *               isRead:
   *                 type: boolean
   *     responses:
   *       200:
   *         description: The updated card status
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Card'
   *       404:
   *         description: Card not found
   */
  router.patch("/:id", updateStatus)

  return router
}

