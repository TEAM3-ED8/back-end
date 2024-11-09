import { Request, Response } from "express"
import {
  createElve,
  deleteElve,
  getAllElves,
  getByIdElve,
  updateElve,
  createElveType,
  updateElveType
} from "../models/ElvesModel"

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
    const id = parseInt(req.params.id)
    if (isNaN(id)) {
      res.status(404).json({ msg: "Invalid ID" })
      return
    }
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
    const { name, age, address, height, mail }: createElveType = req.body
    if (!name || !age || !address || !height || !mail) {
      res.status(404).json({ msg: "All fields are required" })
      return
    }
    const elveCreate = await createElve({ name, age, address, height, mail })
    res.json(elveCreate)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
}

export const update = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id)
    if (isNaN(id)) {
      res.status(404).json({ msg: "Invalid ID" })
      return
    }
    const elve = await getByIdElve({ id })
    if (!elve) {
      res.status(404).json({ msg: "Elve not found" })
      return
    }
    const data: updateElveType = req.body
    elve.id = id
    const elveUpdate = await updateElve(data)
    res.json(elveUpdate)
  } catch (error) {
    res.status(500).json({ error: "Error updating elve" })
  }
}

export const remove = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id)
    if (isNaN(id)) {
      res.status(404).json({ msg: "Invalid ID" })
      return
    }
    const elve = await getByIdElve({ id })
    if (!elve) {
      res.status(404).json({ msg: "Elve not found" })
      return
    }
    await deleteElve({ id, currentValue: elve.isDeleted })
    res.sendStatus(200)
  } catch (error) {
    res.sendStatus(500)
  }
}
