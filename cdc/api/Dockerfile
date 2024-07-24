FROM node:16.19.0-slim as base
FROM base as build_stage

WORKDIR /app
COPY *.json ./
COPY src src/

RUN npm install
RUN npm run build
RUN npm prune --production
FROM base

WORKDIR /app

COPY --from=build_stage /app/dist dist/
COPY --from=build_stage /app/package.json .
COPY --from=build_stage /app/node_modules node_modules/

# "docker-entrypoint.sh" is an script from the base image, node
ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["dist/main"]