package main

import (
	"encoding/json"
	"log"
	"net/http"

	"forgego/app"
)

type InitRequest struct {
	ModuleName string `json:"moduleName"`
}

func main() {
	// Ruta corregida
	http.HandleFunc("/api/init-module", func(w http.ResponseWriter, r *http.Request) {
		log.Println("📥 POST /api/init-module recibido")

		if r.Method != http.MethodPost {
			log.Println("❌ Método no permitido:", r.Method)
			http.Error(w, "Método no permitido", http.StatusMethodNotAllowed)
			return
		}

		var req InitRequest
		if err := json.NewDecoder(r.Body).Decode(&req); err != nil || req.ModuleName == "" {
			log.Println("❌ Error de JSON o módulo vacío:", err)
			http.Error(w, "JSON inválido o nombre de módulo vacío", http.StatusBadRequest)
			return
		}

		log.Println("🔧 Iniciando creación de módulo:", req.ModuleName)
		if err := app.InitGoModule(req.ModuleName); err != nil {
			log.Println("❌ Error al crear módulo:", err)
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		log.Println("✅ Módulo creado exitosamente:", req.ModuleName)
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(map[string]string{
			"message": "Módulo '" + req.ModuleName + "' creado con éxito.",
		})
	})

	// Servir frontend
	fs := http.FileServer(http.Dir("./app/dist"))
	http.Handle("/", fs)

	port := ":8080"
	log.Println("🟢 Servidor escuchando en http://localhost" + port)
	log.Fatal(http.ListenAndServe(port, nil))
}