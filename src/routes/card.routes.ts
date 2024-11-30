import { Router } from "express"
import { create, getAll, getById, update, updateStatus } from "../controllers/CardsController"

export const createCardsRouter = () => {
  const router = Router()

  router.post("/", create)
  router.get("/", getAll)
  router.get("/:id", getById)
  router.put("/:id", update)
  router.patch("/:id", updateStatus)
  return router
}
