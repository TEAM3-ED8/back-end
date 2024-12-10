import { Router } from "express"
import {
  create,
  consume,
  getStats,
  getAllCookies,
  remove,
  update,
  addQuantity
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
   * /api/cookie:
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
   * /api/cookie:
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
   * /api/cookie/stats:
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
   * /api/cookie/consume:
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
 * /api/cookie/{id}:
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
 * /api/cookie/{id}:
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
/**
 * @swagger
 * /api/cookie/add-quantity/{id}:
 *   post:
 *     summary: Add a specific amount of cookies to existing inventory
 *     tags: [SantaCookies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Cookie ID to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantity:
 *                 type: integer
 *                 description: Quantity of cookies to add
 *             required:
 *               - quantity
 *           example:
 *             quantity: 50
 *     responses:
 *       200:
 *         description: Cookie quantity updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Cookie quantity updated successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     name:
 *                       type: string
 *                     calories:
 *                       type: integer
 *                     quantity:
 *                       type: integer
 *                     consumed:
 *                       type: integer
 *                     totalCalories:
 *                       type: integer
 *                     createdAt:
 *                       type: string
 *                     santaId:
 *                       type: integer
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "The amount must be a valid number"
 *       404:
 *         description: Cookie not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Cookie not found"
 */
router.post("/add-quantity/:id", addQuantity);
  return router
}
