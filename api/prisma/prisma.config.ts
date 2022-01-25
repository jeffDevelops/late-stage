import { PrismaClient } from '@prisma/client'

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

/* c8 ignore start */
if (process.env.NODE_ENV === 'development') {
  prisma.$on('query', (e) => {
    console.log('Query: ' + e.query)
    console.log('Duration: ' + e.duration + 'ms')
  })
}
/* c8 ignore stop */

// Register custom Prisma middleware
// prisma.$use(async (params, next) => middleware(params, next))
