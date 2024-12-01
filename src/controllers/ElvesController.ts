import { Request, Response } from "express"
import {
  createElve,
  deleteElve,
  getAllElves,
  getByIdElve,
  updateElve,
  updateElveStatus,
  createElveType,
  updateElveType
} from "../models/ElvesModel"
import { catchedAsync, ClientError, dataResponse } from "../utilities"
import type { Elves } from "@prisma/client"
import type { Pagination } from "../interfaces"

export const getAll = catchedAsync(async (req: Request, res: Response) => {
  const { page, limit, sortBy, sortOrder, name } = req.query;

  if ((limit && isNaN(Number(limit))) || (page && isNaN(Number(page)))) {
    throw new ClientError("Invalid limit or page", 400, "Limit and page must be Numbers.");
  }

  const filter: Partial<Record<keyof Elves, string>> = {};
  if (typeof name === 'string' && name.trim() !== '') {
    filter.name = name.trim();
  }

  const response = await getAllElves({
    page: Number(page) || 1,
    limit: Number(limit) || 10,
    sortBy: sortBy as keyof Elves,
    sortOrder: sortOrder as 'asc' | 'desc',
    filter
  });

  const { data, count, current_page, pages } = response;

  const pagination: Pagination = {
    count,
    current_page,
    pages
  };

  dataResponse(res, 200, data, "Successfully obtained elves.", pagination);
});

export const getById = catchedAsync(async (req: Request, res: Response) => {
  const { id } = req.params

  if (id && isNaN(Number(id))) {
    throw new ClientError("Invalid ID", 400, "The ID must be a Number.")
  }

  const elve: Elves = await getByIdElve({ id: Number(id) })

  dataResponse(res, 200, elve, "Elf successfully obtained.")
})

export const create = catchedAsync(async (req: Request, res: Response) => {
  const elve: Elves = req.body

  const { name, age, address, height, email } = elve

  if (!name || !age || !address || !height || !email)
    throw new ClientError(
      "All fields are required",
      400,
      "Missing required fields"
    )

  const createdElfo: Elves = await createElve(elve)
  dataResponse(res, 201, createdElfo, "Elfo created successfully.")
})

export const update = catchedAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  if (id && isNaN(Number(id))) {
    throw new ClientError("Invalid ID", 400, "ID must be a Number")
  }

  const elve: Elves = req.body

  const { name, age, address, height, email } = elve

  if (!name || !age || !address || !height || !email)
    throw new ClientError(
      "All fields are required",
      400,
      "Missing required fields"
    )

  const updatedElfo: Elves = await updateElve(Number(id), elve)

  dataResponse(res, 200, updatedElfo, "Elfo updated successfully")
})

export const remove = catchedAsync(async (req: Request, res: Response) => {
  const { id } = req.params

  if (id && isNaN(Number(id))) {
    throw new ClientError("Invalid ID", 400, "ID must be a Number")
  }

  const elfFound: Elves = await getByIdElve({ id: Number(id) })

  if (!elfFound)
    throw new ClientError(
      "Elf not found",
      404,
      "An elf with the provided ID was not found."
    )

  const elfRemoved: Elves = await deleteElve({
    id,
    currentValue: elfFound.isDeleted
  })

  dataResponse(res, 200, elfRemoved, "Elf deleted successfully")
})

export const updateStatus = catchedAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const { isDeleted } = req.body

  if (id && isNaN(Number(id)))
    throw new ClientError("Invalid ID", 400, "ID must be a Number")

  if (typeof isDeleted !== 'boolean') {
    throw new ClientError(
      "Invalid isDeleted value",
      400,
      "isDeleted must be a boolean"
    )
  }

  const updatedElve: Elves = await updateElveStatus(Number(id), isDeleted)

  dataResponse(res, 200, updatedElve, "Elf status updated successfully")
})
