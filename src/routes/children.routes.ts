import { Router } from "express"
import {
  create,
  getAll,
  // remove,
  update
} from "../controllers/ChildrensController"

/**
 * @swagger
 * tags:
 *   name: Children
 *   description: API endpoints for managing children's information
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Child:
 *       type: object
 *       required:
 *         - name
 *         - age
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the child
 *         name:
 *           type: string
 *           description: The name of the child
 *         age:
 *           type: integer
 *           description: The age of the child
 */

export const createChildrensRouter = () => {
  const router = Router()

  /**
   * @swagger
   * /api/children:
   *   post:
   *     summary: Create a new child entry
   *     tags: [Children]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Child'
   *     responses:
   *       201:
   *         description: The created child entry
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Child'
   */
  router.post("/", create)

  /**
   * @swagger
   * /api/children:
   *   get:
   *     summary: Retrieve all children
   *     tags: [Children]
   *     responses:
   *       200:
   *         description: A list of children
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Child'
   */
  router.get("/", getAll)

  /**
   * @swagger
   * /api/children/{id}:
   *   put:
   *     summary: Update a child's information
   *     tags: [Children]
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
   *             $ref: '#/components/schemas/Child'
   *     responses:
   *       200:
   *         description: The updated child information
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Child'
   *       404:
   *         description: Child not found
   */
  router.put("/:id", update)

  // Commented out delete route
  // router.delete("/:id", remove)

  return router
}

