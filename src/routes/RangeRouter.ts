import { Router } from "express"
import { create } from "../controllers/RangeController"

export const createRangeRouter = () => {
  const router = Router()

  router.post("/", create)

  return router
}
