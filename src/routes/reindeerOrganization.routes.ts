import { Router } from "express"
import {
  create,
  getAll,
  getById,
  remove,
  update
} from "../controllers/ReindeerOrganizationController"

export const createReindeerOrganizationRouter = () => {
  const router = Router()

  router.get("/", getAll)
  router.get("/:id", getById)
  router.post("/", create)
  router.put("/:id", update)
  router.delete("/:id", remove)

  return router
}
