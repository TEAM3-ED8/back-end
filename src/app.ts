import express, { Request, Response, NextFunction } from "express"
export const app = express()
import { createRangeRouter } from "./routes/range.routes"
import { createElveRouter } from "./routes/elve.routes"
import { createReindeerRouter } from "./routes/reindeer.routes"
import { createAddressRouter } from "./routes/address.routes"

app.use(express.json())

app.get("/", (req, res) => {
  res.json({ message: "API Funcionando!" })
})

// routes

app.use(
  "/api/range",
  (req, res, next) => {
    console.log("Accediendo a /api/range")
    next()
  },
  createRangeRouter()
)

app.use("/api/elve", createElveRouter())
app.use("/api/reindeer", createReindeerRouter())
app.use("/api/address", createAddressRouter())

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack)
  res.status(500).json({ error: "Internal Server Error" })
})
