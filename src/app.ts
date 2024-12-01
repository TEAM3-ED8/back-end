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
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  const description = err.description || "An unexpected error occurred";

  console.error(err);
  errorResponse(res, statusCode, message, description);
});
