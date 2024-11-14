# Step 1: Build the Vite application
FROM node:20-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the application
RUN npm run build

# Step 2: Serve the app using `http-server`
FROM node:20-alpine

# Install `http-server` globally
RUN npm install -g http-server

# Copy the built files from the previous stage
COPY --from=build /app/dist /app/dist

# Set working directory to where the build is located
WORKDIR /app/dist

# Expose port 8080
EXPOSE 8080

# Start the server with `http-server`
CMD ["http-server", "-p", "8080"]
