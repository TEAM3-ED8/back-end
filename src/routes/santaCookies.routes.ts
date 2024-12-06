import { Router } from "express"
import {
  create,
  consume,
  getStats,
  getAllCookies
} from "../controllers/SantaCookiesController"

export const createSantaCookiesRouter = () => {
  const router = Router()
  router.get("/", getAllCookies)
  router.post("/", create)
  router.get("/stats", getStats)
  router.post("/consume", consume)

  return router
}
