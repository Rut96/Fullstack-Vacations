# Install Linux Alpine (specific version) + Node.js (specific version)
FROM node:22-alpine3.20

# Install TypeScript
RUN npm i -g nodemon
RUN npm i -g ts-node

# Create folder names app in Linux root directory for ouur app:
WORKDIR /app

# Copy only package.json
COPY package.json /app

# Install node_modules
RUN npm i

# Copy our app (without node-_modules) from the development folder (.) into image app folder (host image) (/app):
COPY . /app

# --------------------------------------------------------------
# Which termonal command will run our app inside cpmtainer when container start:
ENTRYPOINT npm start

