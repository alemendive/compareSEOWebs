# Etapa 1: Construcción de React
FROM node:16-alpine as build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa 2: Servir el build con serve
FROM node:16-alpine as serve
WORKDIR /app
COPY --from=build /app/dist ./dist
RUN npm install -g serve

# Exponer el puerto 8080 para serve
EXPOSE 8080

# Servir la aplicación
CMD ["serve", "-s", "dist", "-l", "8080"]