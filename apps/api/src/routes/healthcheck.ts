import {
  FastifyPluginCallback,
  FastifyInstance,
  RegisterOptions,
} from 'fastify'

export const healthcheck: FastifyPluginCallback<RegisterOptions> = (
  app: FastifyInstance,
  _: RegisterOptions,
  done: (err?: Error) => any,
) => {
  app.get('/_healthcheck', async (_, res) =>
    res.code(200).send({ status: 'OK' }),
  )

  done()
}
