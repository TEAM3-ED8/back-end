import type { Addresses } from "@prisma/client"
import type { NextFunction, Request, Response } from "express"
import {
  createAddress,
  deleteAddress,
  filterLatestSearches,
  getAllAddress,
  getByIdAddress,
  updateAddress
} from "../models/AddressesModel"
import { catchedAsync } from "../utilities/catchedAsync"
import { dataResponse } from "../utilities/data-response"
import { ClientError } from "../utilities/errors"

export const getAllAddress = async (req: Request, res: Response) => {
  const { limit } = req.query

  if (limit && isNaN(Number(limit)))
    throw new ClientError("Invalid limit", 400, "Limit must be a Number")

  let allAddresses: Addresses[] = []

  if (limit) {
    allAddresses = await filterLatestSearches({ limit: Number(limit) })
  } else {
    allAddresses = await getAllAddress()
  }

  dataResponse(res, 200, allAddresses, "Addresses obtained successfully")
  /* try {
  } catch (error) {
  res.status(200).json(allAddresses)
  res.sendStatus(500)
  } */
}

export const getByIdAddress = catchedAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const address: Addresses = await getByIdAddress({ id: Number(id) })
    dataResponse(res, 200, address, "Address successfully obtained")

    /* try {
    if (!address) {
    res.status(404).json({ msg: "Address not found" })
    return
    }
    res.status(200).json(address)
    } catch (error) {
    res.sendStatus(500)
    next(error)
    } */
  }
)

export const createAddress = async (req: Request, res: Response) => {
  const address: Addresses = req.body

  if (
    !address.country ||
    !address.city ||
    !address.code ||
    !address.search_date
  ) {
    throw new ClientError(
      "All fields are required",
      400,
      "Missing required fields"
    )
  }

  const createdAddress: Addresses = await createAddress(address)
  dataResponse(res, 201, createAddress, "Address created successfully")

  /**
  try {
    const address: Addresses = req.body
    const createdAddress: Addresses = await createAddress(address)
    res.json(createAddress)
  } catch (error) {
    res.sendStatus(500)
  }*/
}

export const updateAddress = async (req: Request, res: Response) => {
  const { id } = req.params

  if (isNaN(Number(id)))
    throw new ClientError("Invalid ID", 400, "ID must be a Number")

  const address: Addresses = req.body

  if (
    !address.country ||
    !address.city ||
    !address.code ||
    !address.search_date
  ) {
    throw new ClientError(
      "All fields are required",
      400,
      "Missing required fields"
    )
  }

  const updatedAddress: Addresses = await updateAddress(Number(id), address)
  dataResponse(res, 200, updateAddress, "Address updated successfully")
  /* try {
  res.json(updatedAddress)
  } catch (error) {
  res.status(500).json({ error: "Error updating address" })
  } */
}

export const deleteAddress = async (req: Request, res: Response) => {
  const { id } = req.params

  if (id && isNaN(Number(id)))
    throw new ClientError("Invalid ID", 400, "ID must be a Number")

  const deleteAddress = await deleteAddress({ id: Number(id) })
  dataResponse(res, 200, updateAddress, "Address deleted successfully")
  /* try {
    res.sendStatus(204)
  } catch (error) {
    res.sendStatus(500)
  } */
}
