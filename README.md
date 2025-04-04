# Proyecto: ForgeGo - Generador Visual de Módulos en Go

**ForgeGo** es una herramienta basada en contenedores que proporciona una interfaz web moderna para crear módulos en Go utilizando una plantilla estandarizada. Está diseñada para funcionar como un servicio independiente dentro del ecosistema SAMM.

---

## 🌐 Tecnologías utilizadas

| Tecnología       | Propósito                                       |
|------------------|-------------------------------------------------|
| **React (SAMM)** | Frontend moderno para formularios y visualización |
| **Tailwind CSS** | Estilo minimalista con responsividad integrada   |
| **Node.js**      | Backend simple con API REST para clonado         |
| **Docker**       | Contenerización completa del entorno              |
| **Git**          | Clonado de la plantilla oficial desde GitHub     |
| **Bash**         | Ejecución del script generador de módulos         |

---

## 🚀 Características principales

- Interfaz gráfica para ingresar:
  - Nombre del módulo (ej. `users-module`)
  - Ruta de destino (ej. `/workspace/proyectos`)
- Botón para ejecutar el proceso de clonación y personalización.
- Vista del log de creación o mensajes de error.
- Sincronización con carpeta compartida del host.

---

## 🛠️ Estructura del contenedor

```
ForgeGo/
├── app/                  # Frontend React (SAMM compatible)
│   ├── public/
│   ├── src/
|   |   ├── main.tsx
│   │   └── InitGoModule.tsx  # Componente principal
│   ├── package.json
│   └── vite.config.ts
├── api/                  # Backend Node.js para ejecutar scripts
│   ├── index.js          # API Express
│   ├── init-handler.js   # Ejecuta el script bash
│   └── package.json
├── scripts/
│   └── init-go-module.sh # Script Bash que clona y prepara el módulo
├── output/               # Carpeta montada donde se crean los proyectos
├── Dockerfile            # Imagen de ForgeGo
├── docker-compose.yml    # Orquestación de contenedor
└── README.md             # Documentación del proyecto

```

---

## ⚡ Uso rápido

```bash
git clone https://github.com/a81Biz/forgego
cd forgego
docker-compose up --build
```

Accede a la interfaz en: [http://localhost:3000](http://localhost:3000)

---

## 🚧 En construcción
- [ ] Selección del template desde UI.
- [ ] Integración directa con SAMM.
- [ ] Compatibilidad con otros lenguajes o frameworks.

---

## 💪 Autonomía
Este proyecto puede ejecutarse de forma independiente o integrarse como módulo visual de SAMM bajo el nombre de `forgego`.