import { Router } from "express"
import {
  create,
  getAll,
  getById,
  remove,
  update,
} from "../controllers/ReindeerController"

/**
 * @swagger
 * tags:
 *   name: Reindeer
 *   description: API endpoints for managing reindeer
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Reindeer:
 *       type: object
 *       required:
 *         - name
 *         - description_of_use
 *         - range_id
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the reindeer
 *         name:
 *           type: string
 *           description: The name of the reindeer
 *         description_of_use:
 *           type: string
 *           description: Description of how the reindeer is used
 *         range_id:
 *           type: integer
 *           description: The id of the associated range
 */

export const createReindeerRouter = () => {
  const router = Router()

  /**
   * @swagger
   * /api/reindeer:
   *   get:
   *     summary: Retrieve all reindeer
   *     tags: [Reindeer]
   *     responses:
   *       200:
   *         description: A list of reindeer
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Reindeer'
   */
  router.get("/", getAll)

  /**
   * @swagger
   * /api/reindeer:
   *   post:
   *     summary: Create a new reindeer
   *     tags: [Reindeer]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Reindeer'
   *     responses:
   *       201:
   *         description: The created reindeer
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Reindeer'
   */
  router.post("/", create)

  /**
   * @swagger
   * /api/reindeer/{id}:
   *   get:
   *     summary: Get a reindeer by id
   *     tags: [Reindeer]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: The reindeer data
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Reindeer'
   *       404:
   *         description: Reindeer not found
   */
  router.get("/:id", getById)

  /**
   * @swagger
   * /api/reindeer/{id}:
   *   put:
   *     summary: Update a reindeer
   *     tags: [Reindeer]
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
   *             $ref: '#/components/schemas/Reindeer'
   *     responses:
   *       200:
   *         description: The updated reindeer
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Reindeer'
   *       404:
   *         description: Reindeer not found
   */
  router.put("/:id", update)

  /**
   * @swagger
   * /api/reindeer/{id}:
   *   delete:
   *     summary: Delete a reindeer
   *     tags: [Reindeer]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Reindeer successfully deleted
   *       404:
   *         description: Reindeer not found
   */
  router.delete("/:id", remove)

  return router
}

