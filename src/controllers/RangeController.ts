import { createRange } from "../models/RangeModel"
import { Request, Response } from "express"

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
