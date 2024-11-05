import { Request, Response } from 'express';
import { createRange, getByIdRange, getAllRange, updateRange, deleteRange } from '../models/RangeModel'

export const create = async (req: Request, res: Response) => {
  try {
    const { range, reindeers } = req.body;
    if (!range || !reindeers) {
      res.status(400).json({ msg: 'Range and reindeers are required' });
      return;
    }
    const newRange = await createRange({ range, reindeers });
    res.status(201).json(newRange);
  } catch (error) {
    res.sendStatus(500);
  }
};

export const getById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const range = await getByIdRange({ id: Number(id) });
    if (!range) {
      res.status(404).json({ msg: 'Range not found' });
      return;
    }
    res.json(range);
  } catch (error) {
    res.sendStatus(500);
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const ranges = await getAllRange();
    res.status(200).json(ranges);
  } catch (error) {
    res.sendStatus(500);
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { range, reindeers } = req.body;
    if (!range || !reindeers) {
      res.status(400).json({ msg: 'Range and reindeers are required' });
      return;
    }
    const updatedRange = await updateRange({ id: Number(id), range, reindeers });
    res.status(200).json(updatedRange);
  } catch (error) {
    res.sendStatus(500);
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await deleteRange({ id: Number(id) });
    res.status(204).send();
  } catch (error) {
    res.sendStatus(500);
  }
};