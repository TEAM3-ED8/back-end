import express, { Request, Response, NextFunction } from "express"
import { corsMiddleware } from "./middlewares/cors"
import swaggerJsDoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"
import { create } from "domain"
import {
  createCardsRouter,
  createElveRouter,
  createRangeRouter,
  createReindeerRouter
} from "./routes"

export const app = express()

import { createRangeRouter } from "./routes/range.routes"
import { createElveRouter } from "./routes/elve.routes"
import { createReindeerRouter } from "./routes/reindeer.routes"
import { createAddressRouter } from "./routes/address.routes"

app.use(corsMiddleware)
app.use(express.json())
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Elves API",
      version: "1.0.0",
      description: "API para gestionar elfos"
    }
  },
  apis: ["./routes/elve.routes.ts"]
}
const swaggerDocs = swaggerJsDoc(swaggerOptions)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.get("/", (req, res) => {
  res.json({ message: "API Funcionando!" })
})



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
app.use("/api/range", createRangeRouter())
app.use("/api/cards", createCardsRouter())
app.use("/api/childrens", createChildrensRouter())


app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack)
  res.status(500).json({ error: "Internal Server Error" })
})
