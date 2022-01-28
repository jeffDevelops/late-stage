import {
  FastifyInstance,
  RegisterOptions,
  FastifyPluginCallback,
} from 'fastify'
import { uploads as uploadsController } from '../controllers/index'

export const uploads: FastifyPluginCallback<RegisterOptions> = (
  app: FastifyInstance,
  _: RegisterOptions,
  done: (err?: Error) => any,
) => {
  app.get('/uploads/:resource', uploadsController)

  done()
}
