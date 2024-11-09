import express, { Request, Response, NextFunction } from "express"
export const app = express()
import { createRangeRouter } from "./routes/range.routes"
import { createElveRouter } from "./routes/elve.routes"
import { createReindeerRouter } from "./routes/reindeer.routes"
import { corsMiddleware } from "./middlewares/cors"
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

app.use(corsMiddleware)
app.use(express.json())
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Elves API',
      version: '1.0.0',
      description: 'API para gestionar elfos',
    },
  },
  apis: ['./routes/elve.routes.ts'],
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

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

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack)
  res.status(500).json({ error: "Internal Server Error" })
})
