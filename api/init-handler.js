export function initGoModule(moduleName) {
  return fetch("http://localhost:8080/init", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ moduleName })
  }).then(async (res) => {
    const data = await res.json()
    if (!res.ok) throw new Error(data.error || "Error desconocido")
    return data
  })
}