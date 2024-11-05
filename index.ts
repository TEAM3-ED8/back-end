import { app } from "./src/app"
// import swaggerSetup from "./swagger";
const PORT = process.env.PORT || 8080
// swaggerSetup(app)
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`)
})
