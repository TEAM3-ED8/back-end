"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataResponse = void 0;
const dataResponse = (res, statusCode = 200, data, message = "Successfully", pagination) => {
    // if (!res || typeof res.json !== "function")
    //   throw new Error("Invalid response object")
    res.status(statusCode).json({
        error: false,
        message,
        data,
        pagination
    });
};
exports.dataResponse = dataResponse;
/* export const dataResponse = (
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
} */
