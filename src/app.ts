import express, { Request, Response, NextFunction } from "express"
import { corsMiddleware,errorResponse } from "./utilities"
import { registerRoutes } from "./routes"

export const app = express()
app.use(corsMiddleware)
app.use(express.json())

app.get("/", (req, res) => {
  res.json({ message: "API Funcionando!" })
})

//* Rutas
registerRoutes(app)

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const { statusCode, message, description } = err

  errorResponse(res, statusCode, message, description)
  //console.error(err.stack)
  // res.status(500).json({ error: "Internal Server Error" })
})
