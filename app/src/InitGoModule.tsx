import { useState } from "react"
import { motion } from "framer-motion"

export default function InitGoModule() {
  const [moduleName, setModuleName] = useState("")
  const [loading, setLoading] = useState(false)
  const [output, setOutput] = useState("")

  const handleSubmit = async () => {
    setLoading(true)
    setOutput("")

    const res = await fetch("/api/init-module", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ moduleName })
    })

    const data = await res.json()
    setOutput(data.message || data.error)
    setLoading(false)
  }

  return (
    <motion.div className="p-6 max-w-xl mx-auto space-y-6">
      <div className="border rounded-xl shadow-md p-6 bg-white space-y-4">
        <h2 className="text-xl font-semibold">Crear nuevo módulo Go</h2>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Nombre del módulo</label>
          <input
            className="w-full px-3 py-2 border rounded-lg text-sm"
            value={moduleName}
            onChange={(e) => setModuleName(e.target.value)}
            placeholder="users-module"
          />
        </div>

        <p className="text-sm text-gray-500">
          El módulo se guardará en <code>/workspace/output/&lt;nombre-del-módulo&gt;</code>
        </p>

        <button
          onClick={handleSubmit}
          disabled={loading || !moduleName}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm disabled:opacity-50"
        >
          {loading ? "Creando..." : "Crear módulo"}
        </button>

        {output && (
          <div className="mt-4 whitespace-pre-wrap text-sm text-gray-600 border-t pt-4">
            {output}
          </div>
        )}
      </div>
    </motion.div>
  )
}