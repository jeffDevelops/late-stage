import { PrismaClient } from '@prisma/client'

export type QueryEvent = {
  timestamp: Date
  query: string // Query sent to the database
  params: string // Query parameters
  duration: number // Time elapsed (in milliseconds) between client issuing query and database responding - not only time taken to run query
  target: string
}

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
  prisma.$on('query', (e: QueryEvent) => {
    console.log('Query: ' + e.query)
    console.log('Duration: ' + e.duration + 'ms')
  })
}
/* c8 ignore stop */
