import {
  FastifyPluginCallback,
  FastifyInstance,
  RegisterOptions,
} from 'fastify'

import { upload as uploadController } from '../controllers/index'
import { clientHasBearerToken } from '../middleware/fastify'

export const upload: FastifyPluginCallback<RegisterOptions> = (
  app: FastifyInstance,
  _: RegisterOptions,
  done: (err?: Error) => any,
) => {
  app.post('/upload', uploadController)

  done()
}
