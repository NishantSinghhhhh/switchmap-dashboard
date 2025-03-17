# I'm using a lightweight Node.js image as the base for the frontend container
FROM node:20-slim AS base

# I'm setting environment variables for better performance
ENV NODE_ENV=development \
    PORT=3000 \
    CHOKIDAR_USEPOLLING=true

# I'm creating a dedicated non-root user for security
RUN groupadd -r switchmap && useradd --no-log-init -r -g switchmap switchmap

# I'm setting the working directory for the Dashboard application
WORKDIR /home/talawa/dashboard

# I'm installing required system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    git \
    && rm -rf /var/lib/apt/lists/*

# I'm switching to the non-root user
USER switchmap

# I'm copying the package files first for efficient caching
COPY --chown=switchmap:switchmap package.json pnpm-lock.yaml ./

# I'm installing dependencies inside the container
RUN corepack enable && pnpm install --frozen-lockfile

# I'm copying the source code into the container
COPY --chown=switchmap:switchmap . .

# I'm exposing the development port for the React app
EXPOSE 3000

# I'm setting the default command to start the development server
CMD ["pnpm", "dev"]
