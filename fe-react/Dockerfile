# Step 1: Build the Vite application
# Use an official Node.js image as the build environment
FROM node:20 AS build

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

# Step 2: Serve the built app with Nginx
# Use an official Nginx image as the base
FROM nginx:stable-alpine

# Copy the built files from the previous stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 to make the app accessible
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
