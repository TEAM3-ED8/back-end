import type { NextFunction } from "express"

export const catchedAsync = (fn) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    fn(req, res).catch((error): void => next(error))
  }
}
