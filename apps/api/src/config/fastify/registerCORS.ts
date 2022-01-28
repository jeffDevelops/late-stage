import cors from 'fastify-cors'
import type { FastifyInstance } from 'fastify'

export const registerCORS = (app: FastifyInstance) => {
  const corsOptions = {
    origin: [process.env.CORS_ORIGIN!],
  }

  app.register(cors, corsOptions)
}
