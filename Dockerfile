# Description: Dockerfile for the frontend
FROM node:16-alpine as builder
# Create app directory
WORKDIR /app

COPY package.json  ./
COPY yarn.lock  ./
# Install app dependencies
RUN yarn install
# Bundle app source
COPY . .
# Build the app
RUN yarn build

# stage 2
FROM nginx:1.21.3-alpine
# Create app directory
WORKDIR /usr/share/nginx/html
# Remove default nginx index page
RUN rm -rf ./*
# Copy from the stage 1
COPY --from=builder /app/build /usr/share/nginx/html
# Expose port 8080
EXPOSE 8080
# Run nginx
CMD ["nginx", "-g", "daemon off;"]

