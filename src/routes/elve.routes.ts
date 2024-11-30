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
  router.get("/", getAll)
  router.post("/", create)
  router.get("/:id", getById)
  router.put("/:id", update)
  router.get("/delete/:id", remove)
  router.delete("/:id", remove)

  return router
}
