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
    const { name, age, gift, conduct, address_id }: createChildrenType =
      req.body
    if (!name || !age || !gift || !conduct || !address_id) {
      res.status(404).json({ msg: "All fields are required" })
      return
    }
    const childrenCreate = await createChildren({
      name,
      age,
      conduct,
      address_id,
      gift
    })
    res.json(childrenCreate)
  } catch (error) {
    console.log(error)
    res.sendStatus(500).json({ error: "Internal Server Error" })
  }
}

export const update = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id)
        if (isNaN(id)) {
        res.status(404).json({ msg: "Invalid ID" })
        return
        }
        const { name, age, gift, conduct, address_id }: createChildrenType = req.body
        if (!name || !age || !gift || !conduct || !address_id) {
        res.status(404).json({ msg: "All fields are required" })
        return
        }
        const childrenUpdate = await updateChildrens({
        id,
        data: {
            name,
            age,
            conduct,
            address_id,
            gift
        }
        })
        res.json(childrenUpdate)
    } catch (error) {
        console.log(error)
        res.sendStatus(500).json({ error: "Internal Server Error" })
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