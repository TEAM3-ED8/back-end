import { Request, Response } from "express"
import {
  createReindeer,
  deleteReindeer,
  getAllReindeer,
  getByIdReineer,
  updateReindeer,
  getIncludesID
} from "../models/ReindeerModel"
import { chatWithAi } from "../utilities/ai"
import { generateReindeerLineupPrompt } from "../prompts"

export const create = async (req: Request, res: Response) => {
  try {
    const reindeer = await createReindeer(req.body)
    res.status(201).json(reindeer)
  } catch (error) {
    res.status(500).json({ error: "Error creating reindeer" })
  }
}
export const getAll = async (req: Request, res: Response) => {
  try {
    const reindeer = await getAllReindeer()
    res.status(200).json(reindeer)
  } catch (error) {
    res.status(500).json({ error: "Error fetchin reindeers" })
  }
}
export const getById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const reindeer = await getByIdReineer({ id: Number(id) })
  } catch (error) {
    res.status(404).json({ error: "Reindeer not found" })
  }
}
export const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const reindeerUpdate = await updateReindeer({ ...req.body, id: Number(id) })
  } catch (error) {}
}
export const remove = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    await deleteReindeer({ id: Number(id) })
    res.status(204).send()
  } catch (error) {
    res.status(500).json({ error: "Error deleting reindeer" })
  }
}

export const generateReindeerLineup = async (req: Request, res: Response) => {
  try {
    const { mission }: { mission: string } = req.body
    if (!mission) {
      res.status(400).json({ msg: "Fields are required" })
      return
    }
    const reindeers = await getAllReindeer()
    const prompt = generateReindeerLineupPrompt({ mission, reindeers })
    const aiResponse = await chatWithAi({ prompt })
    try {
      const ids = JSON.parse(aiResponse)
      const reindeersMission = await getIncludesID({ ids })
      res.status(200).json(reindeersMission)
    } catch {
      res.status(200).json([])
    }
  } catch {
    res.sendStatus(500)
  }
}
