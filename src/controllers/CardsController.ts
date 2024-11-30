import type { Card } from "@prisma/client"
import { Request, Response } from "express"
import { createCard, getAllCards, getByIdCard } from "../models/CardModel"
import { catchedAsync, ClientError, dataResponse } from "../utilities"
import { updateCard } from "./../models/CardModel"

export const getAll = catchedAsync(async (req: Request, res: Response) => {
  const allCards: Card[] = await getAllCards()

  dataResponse(res, 200, allCards, "Cards obtained successfully")
})

export const getById = catchedAsync(async (req: Request, res: Response) => {
  const id = parseInt(req.params.id)

  if (id && isNaN(Number(id))) {
    throw new ClientError("Invalid ID", 400, "The ID must be a Number")
  }

  const card: Card = await getByIdCard({ id: Number(id) })

  dataResponse(res, 200, card, "Card successfully obtained.")
})

export const create = catchedAsync(async (req: Request, res: Response) => {
  const card: Card = req.body

  if (!card.content || !card.children_id) {
    throw new ClientError(
      "All fields are required",
      400,
      "Missing required fields"
    )
  }

  const createdCard: Card = await createCard(card)

  dataResponse(res, 201, createdCard, "Card created successfully")
})

export const update = catchedAsync(async (req: Request, res: Response) => {
  const { id } = req.params

  if (id && isNaN(Number(id)))
    throw new ClientError("Invalid ID", 400, "ID must be a Number")

  const card: Card = req.body

  if (!card.content || !card.children_id) {
    throw new ClientError(
      "All fields are required",
      400,
      "Missing required fields"
    )
  }

  const updatedCard: Card = await updateCard(Number(id), card)

  dataResponse(res, 200, updatedCard, "Address updated successfully")
})
