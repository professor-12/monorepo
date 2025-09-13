# -------------------------------
# 1. Build the React client
# -------------------------------
FROM node:20-alpine AS client-builder

WORKDIR /app/client

# Copy only package.json and package-lock.json first (for caching)
COPY client/package*.json ./

# Install dependencies
RUN npm install --frozen-lockfile

# Copy the rest of the client code
COPY client/ ./

# Build the React app for production
RUN npm run build


# -------------------------------
# 2. Build the server + serve client
# -------------------------------
FROM node:20-alpine AS server

WORKDIR /app/server

# Copy server dependencies definition
COPY server/package*.json ./

# Install server dependencies
RUN npm install --production --frozen-lockfile

# Copy server code
COPY server/ ./

# Copy built React app from first stage into server's static folder
COPY --from=client-builder /app/client/build ./public

# Security best practice: create non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Expose the backend port
EXPOSE 3000

# Start the server (assuming your server uses `npm start`)
CMD ["npm", "start"]
