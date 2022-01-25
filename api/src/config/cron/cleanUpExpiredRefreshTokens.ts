import cron from 'node-cron'
import type { PrismaClient } from '@prisma/client'

export const cleanup = async (prisma: PrismaClient): Promise<void> => {
  await prisma.artificiallyExpiredRefreshToken.findMany({
    where: {
      actualExpiration: {
        lte: new Date(),
      },
    },
  })
}

export const registerCleanUpExpiredRefreshTokensCronJob = (
  prisma: PrismaClient,
) => cron.schedule('0 0 * * 6', async () => await cleanup(prisma))
