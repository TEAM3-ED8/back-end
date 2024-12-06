import type { Addresses } from "@prisma/client"
import type { Request, Response } from "express"
import { ClientError, ServerError, dataResponse, catchedAsync } from "../utilities"
import {
  createAddress,
  deleteAddress,
  filterBySearchDate,
  filterLatestSearches,
  getByIdAddress,
  updateAddress
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
  const { lat, lng, display_name } = req.body

  if (!lat || !lng || !display_name) {
    throw new ClientError(
      "All fields are required",
      400,
      "Missing required fields"
    )
  }

  if (typeof lat !== "string" || typeof lng !== "string") {
    throw new ClientError(
      "Invalid coordinates",
      400,
      "Latitude and longitude must be strings"
    )
  }

  try {
    const createdAddress: Addresses = await createAddress({ lat, lng, display_name })
    dataResponse(res, 201, createdAddress, "Address created successfully")
  } catch (error) {
    if (error instanceof ClientError) {
      throw error
    }
    throw new ServerError("Failed to create address", 500, "An unexpected error occurred while creating the address");
  }
})

export const update = catchedAsync(async (req: Request, res: Response) => {
  const { id } = req.params

  if (id && isNaN(Number(id)))
    throw new ClientError("Invalid ID", 400, "ID must be a Number")

  const { lat, lng, display_name, search_date } = req.body

  if (!lat || !lng || !display_name || !search_date) {
    throw new ClientError(
      "All fields are required",
      400,
      "Missing required fields"
    )
  }

  if (typeof lat !== "string" || typeof lng !== "string") {
    throw new ClientError(
      "Invalid coordinates",
      400,
      "Latitude and longitude must be strings"
    )
  }

  const updatedAddress: Addresses = await updateAddress(Number(id), { lat, lng, display_name, search_date })
  dataResponse(res, 200, updatedAddress, "Address updated successfully")
})

export const remove = catchedAsync(async (req: Request, res: Response) => {
  const { id } = req.params

  if (id && isNaN(Number(id)))
    throw new ClientError("Invalid ID", 400, "ID must be a Number")

  const deletedAddress: Addresses = await deleteAddress({ id: Number(id) })
  dataResponse(res, 200, deletedAddress, "Address deleted successfully")
})

