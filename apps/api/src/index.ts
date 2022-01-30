import 'reflect-metadata'

/** Plugins */
import multipart from 'fastify-multipart'
import { registerAltair } from './config/fastify/registerAltair'
import { registerCookie } from './config/fastify/registerCookie'
import { registerCORS } from './config/fastify/registerCORS'
import { registerMercurius } from './config/fastify/registerMercurius'

/** Modules */
import { initFastify } from './config/fastify/initFastify'
import { healthcheck, upload, uploads } from './routes/index'
import { verifyEnv } from './utility/verifyEnv'
import { startTestServer } from '../test-utils/startTestServer'

verifyEnv()
;(async () => {
  const app = initFastify()

  /** Plugins */
  registerCORS(app)
  registerCookie(app)
  registerMercurius(app) // GraphQL API
  registerAltair(app) // API inspection
  app.register(multipart) // File uploads

  /** Custom route controllers */
  app.register(healthcheck)
  app.register(upload)
  app.register(uploads)

  if (process.env.NODE_ENV === 'test') return startTestServer(app)

  /* c8 ignore start */
  app.listen(process.env.PORT!, (error, address) => {
    if (error) return console.error(error)

    console.log(`GraphQL server running @ ${address}/altair`)
  })
  /* c8 ignore stop */
})()