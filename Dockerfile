# Etapa 1: Construcción del frontend (React)
FROM node:20-alpine AS builder
WORKDIR /app
COPY app ./app
WORKDIR /app/app
RUN npm install && npm run build

# Etapa 2: Contenedor final con servidor y frontend
FROM node:20-alpine
RUN apk add --no-cache git

# Crear directorio de trabajo
WORKDIR /app

# Copiar el backend Node.js
COPY api ./api

# Copiar el build del frontend a la ubicación correcta
COPY --from=builder /app/app/dist ./frontend

# Copiar el script Bash de inicialización
COPY scripts/init-go-module.sh /usr/local/bin/init-go-module.sh
RUN chmod +x /usr/local/bin/init-go-module.sh

# Instalar dependencias del backend
WORKDIR /app/api
RUN npm install

# Exponer puertos
EXPOSE 3000
EXPOSE 5173

# Iniciar backend que también sirve el frontend
CMD ["npm", "start"]