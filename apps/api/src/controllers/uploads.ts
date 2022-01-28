import fs from 'fs'
import path from 'path'
import { FastifyRequest } from 'fastify'
import { UploadOptions } from '../types/UploadOptions'

/* c8 ignore start */ // TODO: remove when introducing file uploads

export const uploads = async (req: FastifyRequest, res: any) => {
  const resource = (req.params as { resource: UploadOptions }).resource

  /** Look in the uploads directory for the requested file */
  const directoryFilenames = fs.readdirSync(path.join(__dirname, '../uploads'))
  const fileName = directoryFilenames.find((file) =>
    file.startsWith(resource as string),
  )

  if (!fileName) {
    return res.status(404).send(`File uploads/${resource} not found`)
  }

  return res.sendFile(fileName, path.join(__dirname, '../uploads'))
}

/* c8 ignore stop */
