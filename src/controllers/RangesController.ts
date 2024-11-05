import {
  createRange,
  deleteRange,
  getAllRange,
  getByIdRange,
  updateRange
} from "../models/RangeModel"
import { Request, Response } from "express"

export const getAll = async (req: Request, res: Response) => {
  try {
    const range = await getAllRange()
    res.json(range)
  } catch (error) {
    res.sendStatus(500)
  }
}

export const getById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const range = await getByIdRange({ id: Number(id) })
    if (!range) {
      res.status(404).json({ msg: "Range not found" })
      return
    }
    res.json(range)
  } catch (error) {
    res.sendStatus(500)
  }
}

export const create = async (req: Request, res: Response) => {
  try {
    const { range }: { range: string } = req.body
    if (!range) {
      res.status(400).json({ msg: "All data is required" })
      return
    }
    const rangeCreated = await createRange({ range })
    res.json(rangeCreated)
  } catch {
    res.sendStatus(500)
  }
}

export const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { range }: { range: string } = req.body
    if (!range) {
      res.status(404).json({ msg: "All data is requered" })
      return
    }
    const rangeUpdate = await updateRange({ id: Number(id), range })
    res.json(rangeUpdate)
  } catch (error) {
    res.sendStatus(500)
  }
}

export const remove = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    await deleteRange({ id: Number(id) })
    res.sendStatus(204)
  } catch (error) {
    res.sendStatus(500)
  }
}
