# Use the Node alpine official image
# https://hub.docker.com/_/node
FROM node:lts-alpine AS build

# Set config
ENV NPM_CONFIG_UPDATE_NOTIFIER=false
ENV NPM_CONFIG_FUND=false

# Create and change to the app directory.
WORKDIR /app

# Copy dependency manifests (and .npmrc for legacy-peer-deps) first for better layer caching.
COPY package.json package-lock.json .npmrc ./

# Install packages
RUN npm ci

# Copy local code to the container image.
COPY . ./

# Vite embeds these at build time — set them in Railway Variables before deploying.
ARG VITE_SITE_URL=
ARG VITE_OG_IMAGE_PATH=
ARG VITE_OG_IMAGE_WIDTH=
ARG VITE_OG_IMAGE_HEIGHT=
ENV VITE_SITE_URL=$VITE_SITE_URL \
    VITE_OG_IMAGE_PATH=$VITE_OG_IMAGE_PATH \
    VITE_OG_IMAGE_WIDTH=$VITE_OG_IMAGE_WIDTH \
    VITE_OG_IMAGE_HEIGHT=$VITE_OG_IMAGE_HEIGHT

# Build the app (client + SSR prerender).
RUN npm run build

# Use the Caddy image
FROM caddy:2-alpine

# Create and change to the app directory.
WORKDIR /app

# Copy Caddyfile to the container image.
COPY Caddyfile ./

# Format the Caddyfile.
RUN caddy fmt Caddyfile --overwrite

# Copy built static files from the build stage.
COPY --from=build /app/dist ./dist

# Use Caddy to run/serve the app
CMD ["caddy", "run", "--config", "Caddyfile", "--adapter", "caddyfile"]
