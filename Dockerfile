# Usa la versión alpine para una imagen más ligera
FROM node:22.14-alpine AS builder

# Establece el directorio de trabajo
WORKDIR /app

# Copia solo package.json y package-lock.json para aprovechar la caché
COPY package*.json ./

# Instala TODAS las dependencias (producción y desarrollo)
RUN npm install

# Copia el código fuente de la aplicación
COPY . .

# Compila la aplicación Angular
RUN npm run build -- --configuration=production

# ============================
# Segunda etapa: Servir con Nginx
# ============================
FROM nginx:1.27.4-alpine AS runner

# Copiar archivos generados en la carpeta dist/browser
COPY --from=builder /app/dist /usr/share/nginx/html

# Copiar configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Exponer el puerto 80
EXPOSE 80

# Comando por defecto para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
