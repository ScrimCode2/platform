import { PrismaClient } from '../prisma/prisma/generated/shop-client'

// Создаем синглтон для Prisma Client
const globalForPrisma = global as unknown as {
  shopPrisma: PrismaClient | undefined
}

export const shopPrisma = globalForPrisma.shopPrisma ?? new PrismaClient()

// Явное подключение к базе при инициализации
shopPrisma.$connect()
  .then(() => console.log('Connected to shop database'))
  .catch((err) => console.error('Connection error:', err))

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.shopPrisma = shopPrisma
}