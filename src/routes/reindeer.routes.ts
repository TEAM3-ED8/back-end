import { Router } from "express"
import {
  create,
  getAll,
  getById,
  remove,
  update,
} from "../controllers/ReindeerController"

export const createReindeerRouter = () => {
  const rounter = Router()

  rounter.get("/", getAll)
  rounter.post("/", create)
  rounter.get("/:id", getById)
  rounter.put("/:id", update)
  rounter.delete("/:id", remove)
  return rounter
}
