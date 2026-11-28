# Turant: build the PWA with Node, serve the static files with nginx.
# Needs no keys and no .env file. `docker compose up` at the repo root opens it on http://localhost:3000
FROM node:22-slim AS build
WORKDIR /app
COPY package.json package-lock.json .npmrc ./
# --ignore-scripts: transformers.js pulls in onnxruntime-node, whose install script downloads CUDA binaries
# that the browser build never uses.
RUN npm ci --ignore-scripts --no-audit --no-fund
COPY . .
# Telugu, Kannada and Tamil speech models (about 100, 100 and 290 MB, not in git): fetched from the live site;
# if that fails the build still succeeds and the app uses whisper-base for those languages.
RUN node scripts/fetch-models.mjs
RUN npm run build

FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
