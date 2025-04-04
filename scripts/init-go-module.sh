#!/bin/sh

set -e

MODULE_NAME="$1"

if [ -z "$MODULE_NAME" ]; then
  echo "Error: nombre del módulo no proporcionado."
  exit 1
fi

TARGET_DIR="/workspace/output/$MODULE_NAME"
REPO_URL="https://github.com/a81Biz/go-docker-template.git"

echo "Clonando módulo base en $TARGET_DIR ..."
git clone "$REPO_URL" "$TARGET_DIR"

cd "$TARGET_DIR"

# Reemplazar nombre del módulo en go.mod
sed -i "s|module go-docker-template|module $MODULE_NAME|" go.mod

# Reemplazar __MODULE_NAME__ en todos los archivos relevantes
echo "Reemplazando '__MODULE_NAME__' por '$MODULE_NAME' en archivos..."

find . -type f \( -name "*.yml" -o -name "*.json" -o -name "*.toml" -o -name "*.go" \) -exec sed -i "s|__MODULE_NAME__|$MODULE_NAME|g" {} +

echo "✅ Módulo '$MODULE_NAME' creado correctamente en $TARGET_DIR"
