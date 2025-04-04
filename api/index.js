import express from "express"
import cors from "cors"
import { initGoModule } from "./init-handler.js"

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())

// API para inicializar módulo Go
app.post("/api/init-module", async (req, res) => {
  const { moduleName } = req.body

  if (!moduleName) {
    return res.status(400).json({ error: "Falta el nombre del módulo." })
  }

  try {
    const result = await initGoModule(moduleName)
    res.json(result)
  } catch (err) {
    res.status(500).json(err)
  }
})

// Servir frontend estático si existe
app.use(express.static("/app/frontend"))
app.get("*", (req, res) => {
  res.sendFile("/app/frontend/index.html")
})

app.listen(port, () => {
  console.log(`ForgeGo backend iniciado en http://localhost:${port}`)
})