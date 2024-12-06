import type { Reindeers, Skills } from "@prisma/client"
import { Request, Response } from "express"
import {
  createReindeer,
  deleteReindeer,
  getAllReindeer,
  getByIdReindeer,
  updateReindeer
} from "../models/ReindeerModel"
import { catchedAsync, ClientError, dataResponse } from "../utilities"

export const getAll = catchedAsync(async (req: Request, res: Response) => {
  const allReindeers: Reindeers[] = await getAllReindeer()

  dataResponse(res, 200, allReindeers, "Reindeers obtained successfully")
})

export const getById = catchedAsync(async (req: Request, res: Response) => {
  const { id } = req.params

  if (id && isNaN(Number(id))) {
    throw new ClientError("Invalid ID", 400, "The ID must be a Number.")
  }

  const reindeer: Reindeers = await getByIdReindeer({ id: Number(id) })

  dataResponse(res, 200, reindeer, "Reindeer successfully obtained")
})

export const create = catchedAsync(async (req: Request, res: Response) => {
  const { name, type, skills } = req.body

  if (!name || !type || !Array.isArray(skills) || skills.length === 0)
    throw new ClientError(
      "All fields are required",
      400,
      "Missing required fields"
    )

  const reindeer: Omit<Reindeers, 'id'> & { skills: Omit<Skills, 'id' | 'reindeerId'>[] } = {
    name,
    type,
    skills
  }

  const createdReindeer = await createReindeer(reindeer)

  dataResponse(res, 201, createdReindeer, "Reindeer created successfully")
})

export const update = catchedAsync(async (req: Request, res: Response) => {
  const { id } = req.params

  if (id && isNaN(Number(id))) {
    throw new ClientError("Invalid ID", 400, "The ID must be a Number.")
  }

  const { name, type, skills } = req.body

  if (!name || !type || !Array.isArray(skills) || skills.length === 0)
    throw new ClientError(
      "All fields are required",
      400,
      "Missing required fields"
    )

  const reindeer: Omit<Reindeers, 'id'> & { skills: Omit<Skills, 'id' | 'reindeerId'>[] } = {
    name,
    type,
    skills
  }

  const updatedReindeer = await updateReindeer(Number(id), reindeer)

  dataResponse(res, 200, updatedReindeer, "Reindeer updated successfully")
})

export const remove = catchedAsync(async (req: Request, res: Response) => {
  const { id } = req.params

  if (id && isNaN(Number(id))) {
    throw new ClientError("Invalid ID", 400, "The ID must be a Number.")
  }

  const deletedReindeer: Reindeers = await deleteReindeer({ id: Number(id) })

  dataResponse(res, 200, deletedReindeer, "Reindeer deleted successfully")
})

