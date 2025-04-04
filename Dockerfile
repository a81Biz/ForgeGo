FROM golang:1.21-alpine

WORKDIR /app

# Instalar dependencias necesarias para Node y Go
RUN apk add --no-cache git bash nodejs npm

# Copiar archivos del proyecto
COPY . .

# Construir frontend con Vite
WORKDIR /app/app
RUN npm install && npm run build

# Volver al root del proyecto y construir backend
WORKDIR /app
RUN go mod tidy && go build -o forgego-server main.go

EXPOSE 8080

CMD ["./forgego-server"]