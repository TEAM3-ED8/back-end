import { Request, Response } from "express"
import {
  createChildren,
  createChildrenType,
  deleteChildren,
  getAllChildrens,
  updateChildrens
} from "../models/ChildrensModel"

export const getAll = async (req: Request, res: Response) => {
  try {
    const childrens = await getAllChildrens()
    res.json(childrens)
  } catch (error) {
    res.sendStatus(500)
  }
}

export const create = async (req: Request, res: Response) => {
  try {
    console.log(req.body)
    const { name, age, gift, conduct }: createChildrenType = req.body
    if (name === undefined || age === undefined || gift === undefined || conduct === undefined) {
      res.status(404).json({ msg: "All fields are required" })
      return
    }
    const childrenCreate = await createChildren({
      name,
      age,
      conduct,
      gift
    })
    res.json(childrenCreate)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Internal Server Error" })
  }
}

export const update = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id)
    if (isNaN(id)) {
      res.status(404).json({ msg: "Invalid ID" })
      return
    }
    const { name, age, gift, conduct }: createChildrenType = req.body
    if (!name || !age || !gift || !conduct ) {
      res.status(404).json({ msg: "All fields are required" })
      return
    }
    const childrenUpdate = await updateChildrens({
      id,
      data: {
        name,
        age,
        conduct,
        gift
      }
    })
    res.json(childrenUpdate)
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
    const children = await deleteChildren({ id, currentValue: false })
    res.json(children)
  } catch (error) {
    res.sendStatus(500)
  }
}