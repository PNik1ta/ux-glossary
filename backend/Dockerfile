FROM node:18-alpine AS builder

# Устанавливаем зависимости для компиляции bcrypt
RUN apk add --no-cache python3 make g++

WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости с полной компиляцией (без кеша)
RUN npm install --force

# Копируем весь код в контейнер
COPY . .
	
# Собираем TypeScript (если используешь NestJS)
RUN npm run build

# --- Финальный слой ---
FROM node:18-alpine

WORKDIR /app

# Копируем только собранный код и package.json
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

# Устанавливаем production-зависимости (сборку уже сделали в builder)
RUN npm install --force

# Открываем порт 5000
EXPOSE 5000

# Запуск приложения
CMD ["npm", "run", "start:prod"]
