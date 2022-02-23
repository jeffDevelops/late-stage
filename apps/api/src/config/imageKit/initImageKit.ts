import ImageKit from 'imagekit'
// import fs from 'fs'

export const imageKit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
  urlEndpoint: 'https://ik.imagekit.io/latestage/',
})
