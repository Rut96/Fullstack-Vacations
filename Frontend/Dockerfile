# Install Linux Alpine (specific version) + Node.js (specific version)
FROM node:22-alpine3.20

# Create folder names app in Linux root directory for our app:
WORKDIR /app

# Copy only package.json
COPY package.json /app

# React enviroment veriables
ENV REACT_APP_ENVIROMENT=development
ENV REACT_APP_BASE_URL=http://localhost:4000/

# Install node_modules
RUN npm i

# Copy our app (without node_modules) from the development folder (.) into image app folder (host image) (/app):
COPY . /app

# --------------------------------------------------------------
    
# Which terminal command will run our app inside container when container start:
ENTRYPOINT npm start
