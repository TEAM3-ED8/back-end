import { Router } from "express"
import {
  createAddress,
  getAllAddress,
  getByIdAddress,
  deleteAddress,
  updateAddress
} from "../controllers/AddressesController"

export const createAddressRouter = () => {
  const router = Router()

  router.get("/", getAllAddress)
  router.get("/:id", getByIdAddress)
  router.post("/", createAddress)
  router.put("/:id", updateAddress)
  router.delete("/:id", deleteAddress)

  return router
}
