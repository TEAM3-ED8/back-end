import { Router } from "express"
import {
  create,
  getAll,
  // remove,
  update
} from "../controllers/ChildrensController"

export const createChildrensRouter = () => {
  const router = Router()

  router.post("/", create)
  router.get("/", getAll)
  // router.delete("/:id", remove)
  router.put("/:id", update)
  return router
}
