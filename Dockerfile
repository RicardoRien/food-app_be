# Add the Node.js docker image
FROM node:18

# Create directory that runs the app on docker
WORKDIR /app

# COPY package.json and yarn.lock files
COPY package.json yarn.lock ./
COPY package*.json ./

# COPY tsconfig
COPY tsconfig.json ./

# COPY Prisma
COPY prisma ./prisma/

# COPY ENV variable
COPY .env ./

# Install ts-node-dev 
# RUN yarn add ts-node-dev@2.0.0 -D

# Install package.json dependencies
RUN yarn

# COPY
COPY . .

# Generate prisma client
RUN yarn prisma generate

# Run and expose the server on port 3000
EXPOSE 3000

# A command to start the server
CMD yarn dev
