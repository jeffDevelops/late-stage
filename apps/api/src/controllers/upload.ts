import fs from 'fs'
import { pipeline } from 'stream'
import { promisify } from 'util'
import path from 'path'
import type { FastifyReply, FastifyRequest } from 'fastify'
import mercurius from 'mercurius'
import { UploadOptions } from '../types/UploadOptions'

/* c8 ignore start */ // TODO: remove when introducing file uploads

const { ErrorWithProps } = mercurius

const pump = promisify(pipeline)

export const upload = async (req: FastifyRequest, res: FastifyReply) => {
  // TODO: check whether authenticated

  const data = await req.file()

  /**
   * Validate the file type of the incoming file
   */

  const extension =
    data.filename.split('.')[data.filename.split('.').length - 1]

  const validFileTypes = ['jpg', 'jpeg', 'png']
  const isValidFileType = validFileTypes.some((ext) => ext === extension)

  if (!isValidFileType) {
    throw new ErrorWithProps(
      `File type ${extension} is not supported. Only ${validFileTypes.join()} are supported`,
    )
  }

  /**
   * Determine whether the incoming file needs to replace an existing one,
   * based on the file name.
   */

  const existingUploadFilenames = fs.readdirSync(
    `${path.join(__dirname, `../uploads`)}`,
  )

  /** Find the file whose name begins with the uploadOption specified in the body. */
  const fileName = existingUploadFilenames.find((file) =>
    file.startsWith(
      (req.query as { uploadOption: UploadOptions }).uploadOption,
    ),
  )

  if (fileName) {
    /** Delete the file to be replaced by the incoming upload */
    fs.rmSync(path.join(__dirname, `../uploads/${fileName}`))
  }

  await pump(
    data.file,
    fs.createWriteStream(
      `uploads/${
        (req.query as { uploadOption: UploadOptions }).uploadOption
      }.${extension}`,
    ),
  )

  return res.send('OK')
}

/* c8 ignore stop */
