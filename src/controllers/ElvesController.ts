import { Request, Response } from "express"
import {
  createElve,
  deleteElve,
  getAllElves,
  getByIdElve,
  updateElve
} from "../models/ElvesModel"
import { Elve } from "../interfaces/Elve"

export const getAll = async (req: Request, res: Response) => {
  try {
    const elves = await getAllElves()
    res.json(elves)
  } catch (error) {
    res.sendStatus(500)
  }
}
export const getById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const elve = await getByIdElve({ id: Number(id) })
    if (!elve) {
      res.status(404).json({ msg: "Elve not found" })
      return
    }
    res.json(elve)
  } catch (error) {
    res.sendStatus(500)
  }
}

export const create = async (req: Request, res: Response) => {
  try {
    const elve:Elve = req.body
    const elveCreate = await createElve(elve)
    res.json(elveCreate)
  } catch (error) {
    res.sendStatus(500)
  }
}
export const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const elve:Elve = req.body

    const elveUpdate = await updateElve(Number(id), elve)
    res.json(elveUpdate)
  } catch (error) {
    res.status(500).json({ error: "Error updating elve" })
  }
}
export const remove = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    await deleteElve({ id: Number(id) })
    res.sendStatus(204)
  } catch (error) {
    res.sendStatus(500)
  }
}
