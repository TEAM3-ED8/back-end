import { Router } from "express"
import { create, getAll, getById } from "../controllers/MembersController"

export const createMemberRouter = () => {
  const router = Router()

  router.get("/", getAll)
  router.get("/:id", getById)
  router.post("/", create)

  return router
}
