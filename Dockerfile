# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app

# Copy package.json và install dependencies
COPY package*.json ./
RUN npm install

# Copy source và build
COPY . .
RUN npm run build

# Stage 2: Production
FROM node:20-alpine
WORKDIR /app

# Set production environment
ENV NODE_ENV=production
ENV PORT=3000

# Copy package.json và cài production dependencies
COPY package*.json ./
RUN npm install --production

# Copy build từ stage builder
COPY --from=builder /app/dist ./dist

# Expose port
EXPOSE 3000

# Start app
CMD ["node", "dist/main.js"]
