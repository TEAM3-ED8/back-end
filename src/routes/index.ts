import { Express } from "express"
import { createElveRouter } from "./elve.routes"
import { createReindeerRouter } from "./reindeer.routes"
import { createAddressRouter } from "./address.routes"
import { createRangeRouter } from "./range.routes"
import { createCardsRouter } from "./card.routes"
import { createChildrensRouter } from "./children.routes"
import { createMemberRouter } from "./member.routes"

export const registerRoutes = (app: Express) => {
  app.use("/api/elfo", createElveRouter())
  app.use("/api/reindeer", createReindeerRouter())
  app.use("/api/address", createAddressRouter())
  app.use("/api/range", createRangeRouter())
  app.use("/api/card", createCardsRouter())
  app.use("/api/children", createChildrensRouter())
  app.use("/api/member", createMemberRouter())
}
