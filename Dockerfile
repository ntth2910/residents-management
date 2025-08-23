# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app

# Copy package.json + package-lock.json để install dependencies
COPY package*.json ./
RUN npm install

# Copy toàn bộ source code và build
COPY . .
RUN npm run build

# Stage 2: Production
FROM node:20-alpine
WORKDIR /app

# Copy package.json để install production dependencies
COPY package*.json ./
RUN npm install --production

# Copy build từ stage builder
COPY --from=builder /app/dist ./dist

# Set environment
ENV NODE_ENV=production

# Expose port NestJS
EXPOSE 3000

# Start app
CMD ["node", "dist/main.js"]
