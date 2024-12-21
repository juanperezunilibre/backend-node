FROM node:slim

# Crear el directorio de trabajo
WORKDIR /app

COPY package.json /app

# Instalar las dependencias
RUN npm install

# Copiar el código fuente
COPY . /app

# Exponer el puerto 3000
EXPOSE 3000

CMD ["npm", "start"]

