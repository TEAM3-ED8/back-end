import express from "express"
export const app = express()
import { createRangeRouter } from "./routes/range.routes"
import { createElveRouter } from "./routes/Elve.routes"

app.use(express.json())

app.get("/", (req, res) => {
  res.json({ message: "API Funcionando!" })
})

//routes
app.use("/api/range", createRangeRouter())
app.use("/api/elve", createElveRouter())
