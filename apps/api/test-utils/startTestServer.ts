import type { FastifyInstance } from 'fastify'

export const TTL_AFTER_LAST_REQUEST = 3000

/**
 * Kills itself after integration test requests have ceased,
 * so that SIGTERM can trigger coverage report.
 *
 * @param app
 * @returns void
 */
export const startTestServer = (app: FastifyInstance) => {
  let timeout: NodeJS.Timeout

  app.addHook('onRequest', (req, _res, done) => {
    clearTimeout(timeout)

    if (req.raw.url !== '/_healthcheck') {
      timeout = setTimeout(() => {
        process.exit(0)
      }, TTL_AFTER_LAST_REQUEST)
    }

    done()
  })

  app.listen(process.env.TEST_PORT!, (_error, address) => {
    console.log(`GraphQL test server running @ ${address}/altair`)
  })
}
