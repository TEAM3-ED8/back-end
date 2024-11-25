import { Request, Response } from "express"
import {
  createCard,
  createCardType,
  deleteCard,
  getAllCards,
  getByIdCard
} from "../models/CardModel"

export const getAll = async (req: Request, res: Response) => {
  try {
    const cards = await getAllCards()
    res.json(cards)
  } catch (error) {
    res.sendStatus(500)
  }
}

export const getById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id)
    if (isNaN(id)) {
      res.status(404).json({ msg: "Invalid ID" })
      return
    }
    const card = await getByIdCard({ id: Number(id) })
    if (!card) {
      res.status(404).json({ msg: "Card not found" })
      return
    }
    res.json(card)
  } catch (error) {
    res.sendStatus(500)
  }
}

export const create = async (req: Request, res: Response) => {
  try {
    const { content, children_id, isRead }: createCardType = req.body
    if (!content || !children_id) {
      res.status(404).json({ msg: "All fields are required" })
      return
    }
    const cardCreate = await createCard({
      content,
      children_id,
      isRead
    })
    res.json(cardCreate)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Internal Server Error" })
  }
}

export const remove = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id)
    if (isNaN(id)) {
      res.status(404).json({ msg: "Invalid ID" })
      return
    }
    const card = await getByIdCard({ id: Number(id) })
    if (!card) {
      res.status(404).json({ msg: "Card not found" })
      return
    }
    await deleteCard({ id: Number(id), currentValue: card.isRead })
    res.json({ msg: "Card deleted" })
  } catch (error) {
    res.sendStatus(500)
  }
}