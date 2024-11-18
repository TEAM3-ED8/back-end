import type { Addresses } from "@prisma/client"
import type { Request, Response } from "express"
import {
  createAddress,
  deleteAddress,
  getAllAddress,
  getByIdAddress,
  updateAddress
} from "../models/AddressesModel"

export const getAll = async (req: Request, res: Response) => {
  try {
    const allAddresses: Addresses[] = await getAllAddress()
    res.json(allAddresses)
  } catch (error) {
    res.sendStatus(500)
  }
}

export const getById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const address = await getByIdAddress({ id: Number(id) })

    if (!address) {
      res.status(404).json({ msg: "Address not found" })
      return
    }
    res.json(address)
  } catch (error) {
    res.sendStatus(500)
  }
}

export const create = async (req: Request, res: Response) => {
  try {
    const address: Addresses = req.body
    const createdAddress: Addresses = await createAddress(address)
    res.json(createAddress)
  } catch (error) {
    res.sendStatus(500)
  }
}

export const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const address: Addresses = req.body

    const updatedAddress: Addresses = await updateAddress(Number(id), address)
    res.json(updatedAddress)
  } catch (error) {
    res.status(500).json({ error: "Error updating address" })
  }
}

export const remove = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    await deleteAddress({ id: Number(id) })
    res.sendStatus(204)
  } catch (error) {
    res.sendStatus(500)
  }
}
