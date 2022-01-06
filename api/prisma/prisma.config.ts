import Prisma from '@prisma/client'
const { PrismaClient } = Prisma
// import { middleware } from '../middleware/index.example'

export const prisma = new PrismaClient({
  log: [
    {
      emit: 'event',
      level: 'query',
    },
    {
      emit: 'stdout',
      level: 'error',
    },
    {
      emit: 'stdout',
      level: 'info',
    },
    {
      emit: 'stdout',
      level: 'warn',
    },
  ],
})

// Enable logging

if (process.env.NODE_ENV === 'development') {
  prisma.$on('query', (e) => {
    console.log('Query: ' + e.query)
    console.log('Duration: ' + e.duration + 'ms')
  })
}

// Register custom Prisma middleware
// prisma.$use(async (params, next) => middleware(params, next))
