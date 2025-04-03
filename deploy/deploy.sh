#!/bin/bash

# Ruta al directorio de tu aplicación
# APP_DIR="/edendusk-api"


# Cargar variables de entorno desde el archivo .env
export $(grep -v '^#' .env | xargs)
# Cambiar al directorio de la aplicación
cd ..
# cd $APP_DIR

# Actualizar el código
git checkout $BRANCH
git pull origin $BRANCH  # o la rama que estés utilizando

# Reiniciar los contenedores de Docker
docker compose -f docker-compose.staging.yaml down
docker compose -f docker-compose.staging.yaml build
docker compose -f docker-compose.staging.yaml up -d

echo "Despliegue completado en $(date)" >> /var/log/deploy.log
