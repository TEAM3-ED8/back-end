import type { Addresses } from "@prisma/client"
import type { Request, Response } from "express"
import { catchedAsync } from "../utilities/catchedAsync"
import { dataResponse } from "../utilities/data-response"
import { ClientError } from "../utilities/errors"
import {
  filterLatestSearches,
  getByIdAddress,
  createAddress,
  updateAddress,
  deleteAddress,
  filterBySearchDate
} from "./../models/AddressesModel"
import { prisma } from "../prisma"

export const getAll = catchedAsync(async (req: Request, res: Response) => {
  const { limit } = req.query

  if (limit && isNaN(Number(limit))) {
    throw new ClientError("Invalid limit", 400, "Limit must be a Number.")
  }

  let allAddresses: Addresses[] = []

  if (limit) {
    allAddresses = await filterLatestSearches({ limit: Number(limit) })
  } else {
    allAddresses = await prisma.addresses.findMany()
  }

  dataResponse(res, 200, allAddresses, "Addresses obtained successfully")
})

export const getById = catchedAsync(async (req: Request, res: Response) => {
  const { id } = req.params

  if (id && isNaN(Number(id))) {
    throw new ClientError("Invalid ID", 400, "The ID must be a Number.")
  }

  const address: Addresses = await getByIdAddress({ id: Number(id) })
  dataResponse(res, 200, address, "Address successfully obtained.")
})

export const getByDate = catchedAsync(async (req, res) => {
  const { search_date } = req.params

  if (!search_date || search_date.trim().length === 0) {
    throw new ClientError("Invalid date", 400, "The date must be a string.")
}


 

  const date = new Date(search_date)

  if (isNaN(date.getTime())) {
    throw new ClientError(
      "Invalid date format",
      400,
      "The date must be a valid ISO 8601 string."
    )
  }

  const address: Addresses = await filterBySearchDate({ searchDate: date })
  dataResponse(res, 200, address, "Address obtained by date successfully.")
})

export const create = catchedAsync(async (req: Request, res: Response) => {
  const address: Addresses = req.body

  if (!address.lat || !address.lng || !address.display_name) {
    throw new ClientError(
      "All fields are required",
      400,
      "Missing required fields"
    )
  }

  const createdAddress: Addresses = await createAddress(address)
  dataResponse(res, 201, createdAddress, "Address created successfully")
})

export const update = catchedAsync(async (req: Request, res: Response) => {
  const { id } = req.params

  if (id && isNaN(Number(id)))
    throw new ClientError("Invalid ID", 400, "ID must be a Number")

  const address: Addresses = req.body

  if (
    !address.lat ||
    !address.lng ||
    !address.display_name ||
    !address.search_date
  ) {
    throw new ClientError(
      "All fields are required",
      400,
      "Missing required fields"
    )
  }

  const updatedAddress: Addresses = await updateAddress(Number(id), address)
  dataResponse(res, 200, updatedAddress, "Address updated successfully")
})

export const remove = catchedAsync(async (req: Request, res: Response) => {
  const { id } = req.params

  if (id && isNaN(Number(id)))
    throw new ClientError("Invalid ID", 400, "ID must be a Number")

  const deletedAddress: Addresses = await deleteAddress({ id: Number(id) })
  dataResponse(res, 200, deletedAddress, "Address deleted successfully")
})
