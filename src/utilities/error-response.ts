import type { Response } from "express"
import type { ClientError, ServerError } from "./errors"

export const errorResponse: ClientError | ServerError = (
  res: Response,
  statusCode: number,
  message: string,
  description: string
): void => {
  res.status(statusCode).json({
    error: true,
    message,
    description
  })
}
