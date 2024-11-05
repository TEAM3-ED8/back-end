import express from "express"
export const app = express()
import { createRangeRouter } from "./routes/range.routes"
import { createElveRouter } from "./routes/elve.routes"
import { createReindeerRouter } from "./routes/reindeer.routes"

app.use(express.json())

app.get("/", (req, res) => {
  res.json({ message: "API Funcionando!" })
})

//routes
app.use("/api/range", createRangeRouter())
app.use("/api/elve", createElveRouter())
app.use("/api/reindeer", createReindeerRouter())
