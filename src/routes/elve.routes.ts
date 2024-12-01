import { Router } from "express"
import {
  getAll,
  create,
  getById,
  remove,
  update,
  updateStatus,
} from "../controllers/ElvesController"

export const createElveRouter = () => {
  const router = Router()
  router.get("/", getAll)
  router.post("/", create)
  router.get("/:id", getById)
  router.put("/:id", update)
  router.patch("/:id", updateStatus)
  router.delete("/:id", remove)

  return router
}

