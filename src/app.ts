import express from "express"
export const app = express()
import { createRangeRouter } from "./routes/RangeRouter"

app.use(express.json())

app.get("/", (req, res) => {
  res.json({ message: "API Funcionando!" })
})

//routes
app.use("/api/range", createRangeRouter())
