import { Request, Response } from "express"
import {
  createChildren,
  createChildrenType,
  deleteChildren,
  getAllChildrens,
  updateChildrens,
  isValidBehavior,
  isValidLevelBehavior
} from "../models/ChildrensModel"

export const getAll = async (req: Request, res: Response) => {
  try {
    const childrens = await getAllChildrens()
    res.json(childrens)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Internal Server Error" })
  }
}

export const create = async (req: Request, res: Response) => {
  try {
    const { name, behavior, levelBehavior, gift }: createChildrenType = req.body
    
    if (!name || gift === undefined) {
      res.status(404).json({ msg: "Name and gift are required" })
      return
    }

    if (!isValidBehavior(behavior)) {
      res.status(400).json({ 
        msg: "Invalid behavior. Must be: Kind, Brave, Respectful, Curious or Helpful" 
      })
      return
    }

    if (!isValidLevelBehavior(levelBehavior)) {
      res.status(400).json({ 
        msg: "Invalid levelBehavior. Must be: Good, Regular or Bad" 
      })
      return
    }

    const childrenCreate = await createChildren({
      name,
      behavior,
      levelBehavior,
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
    
    const { name, behavior, levelBehavior, gift }: createChildrenType = req.body
    
    if (!name || gift === undefined) {
      res.status(404).json({ msg: "Name and gift are required" })
      return
    }

    if (!isValidBehavior(behavior)) {
      res.status(400).json({ 
        msg: "Invalid behavior. Must be: Kind, Brave, Respectful, Curious or Helpful" 
      })
      return
    }

    if (!isValidLevelBehavior(levelBehavior)) {
      res.status(400).json({ 
        msg: "Invalid levelBehavior. Must be: Good, Regular or Bad" 
      })
      return
    }

    const childrenUpdate = await updateChildrens({
      id,
      data: {
        name,
        behavior,
        levelBehavior,
        gift
      }
    })
    res.json(childrenUpdate)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Internal Server Error" })
  }
}