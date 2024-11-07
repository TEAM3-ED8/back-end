import { Router } from "express"
import { create, getAll, getById, remove, update } from "../controllers/RangesController"

export const createRangeRouter = () => {
  const router = Router()
  
  router.post("/", create)
  router.get("/", getAll) 
  router.get("/:id", getById) 
  router.put("/:id", update)
  router.delete("/:id", remove) 
  
  return router
}
