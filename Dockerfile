FROM node:16
ARG VERSION
ENV APPLICATION_VERSION=$VERSION

WORKDIR /app

COPY package.json /app/package.json

RUN npm i

COPY dist /app/dist

EXPOSE 3000
CMD ["node", "/app/dist/main"]