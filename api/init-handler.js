import { exec } from "child_process"
import path from "path"
import fs from "fs"

export function initGoModule(moduleName) {
  return new Promise((resolve, reject) => {
    if (!moduleName) {
      return reject({ error: "Nombre de módulo no proporcionado." })
    }

    const outputDir = "/workspace/output"
    const fullPath = path.join(outputDir, moduleName)

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true })
    }

    const cmd = `/usr/local/bin/init-go-module.sh ${moduleName}`

    exec(cmd, { cwd: outputDir }, (err, stdout, stderr) => {
      if (err) {
        return reject({ error: stderr || err.message })
      }
      return resolve({ message: stdout })
    })
  })
}
