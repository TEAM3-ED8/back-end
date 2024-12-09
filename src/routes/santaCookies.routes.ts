import { Router } from "express"
import {
  create,
  consume,
  getStats,
  getAllCookies,
  remove,
  update
} from "../controllers/SantaCookiesController"

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

export const createSantaCookiesRouter = () => {
  const router = Router()

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
  router.get("/", getAllCookies)

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
  router.post("/", create)

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
  router.get("/stats", getStats)

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
  router.post("/consume", consume)
  /**
 * @swagger
 * /api/santaCookies/{id}:
 *   put:
 *     summary: Updates an existing cookie
 *     tags: [SantaCookies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Cookie ID to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               calories:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Cookie updated successfully
 *       400:
 *         description: Invalid data
 *       404:
 *         description: Cookie not found
 */
  router.put("/:id", update)
  /**
 * @swagger
 * /api/santaCookies/{id}:
 *   delete:
 *     summary: Delete a cookie
 *     tags: [SantaCookies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Cookie ID to delete
 *     responses:
 *       200:
 *         description: Cookie successfully removed
 *       404:
 *         description: Cookie not found
 */
  router.delete("/:id", remove)
  return router
}
