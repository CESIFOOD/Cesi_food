#Dockerfile pour configurer l'application Node.js  avec la derniére version de node
FROM node:latest

# Définir le répertoire de travail
WORKDIR /app
# Copier les fichiers package.json et package-lock.json
COPY package*.json ./
# Installer les dépendances
RUN npm install
#RUN npm rebuild bcrypt
# Copier tout le reste des fichiers dans le conteneur
COPY . .
# Démarrer l'application
# Utiliser nodemon pour le développement
CMD ["npm", "run", "dev"]