import type { Positions } from "@prisma/client"
import type { Request, Response } from "express"
import type { ReindeerOrganizations } from "../interfaces"
import {
  createOrganization,
  deleteOrganization,
  getAllOrganizations,
  getByIdOrganization,
  updateOrganization
} from "../models/ReindeerOrganizationModel"
import { catchedAsync, ClientError, dataResponse } from "../utilities"

export const getAll = catchedAsync(async (req: Request, res: Response) => {
  const allOrganizations = await getAllOrganizations()

  dataResponse(
    res,
    200,
    allOrganizations,
    "Successfully obtained organizations."
  )
})

export const getById = catchedAsync(async (req: Request, res: Response) => {
  const { id } = req.params

  if (id && isNaN(Number(id))) {
    throw new ClientError("Invalid ID", 400, "The ID must be a Number.")
  }

  const organization: ReindeerOrganizations = await getByIdOrganization({
    id: Number(id)
  })

  dataResponse(res, 200, organization, "Organization successfully obtained.")
})

export const create = catchedAsync(async (req: Request, res: Response) => {
  const { name, isSelected, isAvailable, positions } = req.body

  if (!name || !Array.isArray(positions) || positions.length === 0) {
    throw new ClientError(
      "All fields are required",
      400,
      "Missing required fields"
    )
  }

  const organization: Omit<ReindeerOrganizations, "id"> = {
    name,
    isAvailable,
    isSelected,
    positions: positions.map((pos: Positions): Positions => (pos))
  }

  const createdOrganization: ReindeerOrganizations = await createOrganization(
    organization
  )

  dataResponse(
    res,
    201,
    createdOrganization,
    "Organization created successfully."
  )
})

export const update = catchedAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  if (id && isNaN(Number(id))) {
    throw new ClientError("Invalid ID", 400, "ID must be a Number")
  }

  const { name, isSelected, isAvailable, positions } = req.body

  if (!name || !Array.isArray(positions) || positions.length === 0) {
    throw new ClientError(
      "All fields are required",
      400,
      "Missing required fields"
    )
  }

  const organization: ReindeerOrganizations = {
    id: Number(id),
    name,
    isAvailable,
    isSelected,
    positions: positions.map((pos: Positions): Positions => pos)
  }

  const updatedOrganization: ReindeerOrganizations = await updateOrganization(
    organization
  )

  dataResponse(
    res,
    200,
    updatedOrganization,
    "Organization updated successfully."
  )
})

export const remove = catchedAsync(async (req: Request, res: Response) => {
  const { id } = req.params

  if (id && isNaN(Number(id))) {
    throw new ClientError("Invalid ID", 400, "ID must be a Number")
  }

  const organizationFound = await getByIdOrganization({ id: Number(id) })

  if (!organizationFound)
    throw new ClientError(
      "Organization not found",
      404,
      "An Organization with the provided ID was not found."
    )

  const deletedOrganization = await deleteOrganization({ id: Number(id) })

  dataResponse(
    res,
    200,
    deletedOrganization,
    "Organization deleted successfully."
  )
})
