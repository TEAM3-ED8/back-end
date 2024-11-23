import { Router } from "express"
import { create, getAll, getById, remove } from "../controllers/CardsController"

export const createCardsRouter = () => {
  const router = Router()

  router.post("/", create)
  router.get("/", getAll)
  router.get("/:id", getById)
  router.delete("/:id", remove)
  return router
}
