FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
# Каталог загрузок перекрывается томом uploads_data, но владелец нужен node:
# процесс работает без root-прав, иначе multer не сможет писать.
RUN mkdir -p uploads && chown node:node uploads
USER node
EXPOSE 5000
CMD ["node", "src/index.js"]
