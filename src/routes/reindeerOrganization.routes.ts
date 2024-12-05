import { Router } from "express"
import {
  create,
  getAll,
  getById,
  remove,
  update
} from "../controllers/ReindeerOrganizationController"

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

export const createReindeerOrganizationRouter = () => {
  const router = Router()

  /**
   * @swagger
   * /api/reindeer-organization:
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
  router.get("/", getAll)

  /**
   * @swagger
   * /api/reindeer-organization/{id}:
   *   get:
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
  router.get("/:id", getById)

  /**
   * @swagger
   * /api/reindeer-organization:
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
  router.post("/", create)

  /**
   * @swagger
   * /api/reindeer-organization/{id}:
   *   put:
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
  router.put("/:id", update)

  /**
   * @swagger
   * /api/reindeer-organization/{id}:
   *   delete:
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
  router.delete("/:id", remove)

  return router
}
