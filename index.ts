import { app } from "./src/app"
import swaggerSetup from "./src/swagger";
const PORT = process.env.PORT || 3000
swaggerSetup(app)
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`)
})
