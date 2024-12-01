import type { Response } from "express"
import type { ClientError, ServerError } from "./errors"

export const errorResponse = (
  res: Response,
  statusCode: number,
  message: string,
  description: string
): void => {
  res.status(statusCode || 500).json({
    error: true,
    message,
    description
  })
}

