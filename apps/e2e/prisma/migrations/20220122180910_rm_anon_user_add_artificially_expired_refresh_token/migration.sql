/*
  Warnings:

  - You are about to drop the column `anonUserId` on the `BankCampaignCompletion` table. All the data in the column will be lost.
  - You are about to drop the `AnonUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_AnonUserCompletedCampaigns` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_AnonUserCompletedChecklistItems` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BankCampaignCompletion" DROP CONSTRAINT "BankCampaignCompletion_anonUserId_fkey";

-- DropForeignKey
ALTER TABLE "_AnonUserCompletedCampaigns" DROP CONSTRAINT "_AnonUserCompletedCampaigns_A_fkey";

-- DropForeignKey
ALTER TABLE "_AnonUserCompletedCampaigns" DROP CONSTRAINT "_AnonUserCompletedCampaigns_B_fkey";

-- DropForeignKey
ALTER TABLE "_AnonUserCompletedChecklistItems" DROP CONSTRAINT "_AnonUserCompletedChecklistItems_A_fkey";

-- DropForeignKey
ALTER TABLE "_AnonUserCompletedChecklistItems" DROP CONSTRAINT "_AnonUserCompletedChecklistItems_B_fkey";

-- AlterTable
ALTER TABLE "BankCampaignCompletion" DROP COLUMN "anonUserId";

-- DropTable
DROP TABLE "AnonUser";

-- DropTable
DROP TABLE "_AnonUserCompletedCampaigns";

-- DropTable
DROP TABLE "_AnonUserCompletedChecklistItems";

-- CreateTable
CREATE TABLE "ArtificiallyExpiredRefreshToken" (
    "id" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "ArtificiallyExpiredRefreshToken_pkey" PRIMARY KEY ("id")
);
