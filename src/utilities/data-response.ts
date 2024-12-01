import type { Addresses } from "@prisma/client"
import type { Response } from "express"
import type { Pagination } from "../interfaces"

export const dataResponse = (
  res: Response,
  statusCode: number = 200,
  data: Addresses[] | Addresses,
  message: string = "Successfully",
  pagination?: Pagination
): void => {
  // if (!res || typeof res.json !== "function")
  //   throw new Error("Invalid response object")

  res.status(statusCode).json({
    error: false,
    message,
    data,
    pagination
  })
}
