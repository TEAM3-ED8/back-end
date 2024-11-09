import { Router } from "express"
import {
  getAll,
  create,
  getById,
  remove,
  update
} from "../controllers/ElvesController"

export const createElveRouter = () => {
  const router = Router()

  /**
   * @swagger
   * /api/elve:
   *   get:
   *     summary: Obtiene una lista de todos los elfos
   *     responses:
   *       200:
   *         description: Lista de elfos
   */
  router.get("/", getAll)

  /**
   * @swagger
   * /api/elve:
   *   post:
   *     summary: Crea un nuevo elfo
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               name:
   *                 type: string
   *               age:
   *                 type: integer
   *     responses:
   *       201:
   *         description: Elfo creado exitosamente
   */
  router.post("/", create)

  /**
   * @swagger
   * /api/elve/{id}:
   *   get:
   *     summary: Obtiene un elfo por su ID
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Elfo encontrado
   *       404:
   *         description: Elfo no encontrado
   */
  router.get("/:id", getById)

  /**
   * @swagger
   * /api/elve/{id}:
   *   put:
   *     summary: Actualiza un elfo por su ID
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
   *               name:
   *                 type: string
   *               age:
   *                 type: integer
   *     responses:
   *       200:
   *         description: Elfo actualizado exitosamente
   *       500:
   *         description: Error actualizando el elfo
   */
  router.put("/:id", update)

  /**
   * @swagger
   * /api/elve/{id}:
   *   delete:
   *     summary: Elimina un elfo por su ID
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       204:
   *         description: Elfo eliminado exitosamente
   *       500:
   *         description: Error eliminando el elfo
   */
  router.get("/delete/:id", remove)

  return router
}
