/*
  Warnings:

  - Added the required column `isAdmin` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CampaignStatus" AS ENUM ('ACTIVE', 'OPEN', 'CLOSED');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "banned" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isAdmin" BOOLEAN NOT NULL;

-- CreateTable
CREATE TABLE "AnonUser" (
    "id" TEXT NOT NULL,
    "banned" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AnonUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Campaign" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdByUserId" TEXT NOT NULL,
    "status" "CampaignStatus" NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "goal" DOUBLE PRECISION NOT NULL,
    "goalUnit" TEXT NOT NULL,
    "goalVerb" TEXT,
    "goalStartDate" TIMESTAMP(3) NOT NULL,
    "goalDeadline" TIMESTAMP(3) NOT NULL,
    "realizedValue" DOUBLE PRECISION NOT NULL,
    "what" TEXT[],
    "why" TEXT[],
    "outcomes" TEXT[],
    "shortName" TEXT NOT NULL,
    "checklistItemId" TEXT,
    "campaignSpecificFields" JSONB,

    CONSTRAINT "Campaign_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChecklistItem" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ChecklistItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BankCampaignCompletion" (
    "id" TEXT NOT NULL,
    "anonUserId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "withdrawalReceiptImageURL" TEXT NOT NULL,
    "removedFromInstitution" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "BankCampaignCompletion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UserCompletedCampaigns" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_UserCompletedChecklistItems" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_AnonUserCompletedCampaigns" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_AnonUserCompletedChecklistItems" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Campaign_checklistItemId_key" ON "Campaign"("checklistItemId");

-- CreateIndex
CREATE UNIQUE INDEX "_UserCompletedCampaigns_AB_unique" ON "_UserCompletedCampaigns"("A", "B");

-- CreateIndex
CREATE INDEX "_UserCompletedCampaigns_B_index" ON "_UserCompletedCampaigns"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_UserCompletedChecklistItems_AB_unique" ON "_UserCompletedChecklistItems"("A", "B");

-- CreateIndex
CREATE INDEX "_UserCompletedChecklistItems_B_index" ON "_UserCompletedChecklistItems"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AnonUserCompletedCampaigns_AB_unique" ON "_AnonUserCompletedCampaigns"("A", "B");

-- CreateIndex
CREATE INDEX "_AnonUserCompletedCampaigns_B_index" ON "_AnonUserCompletedCampaigns"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AnonUserCompletedChecklistItems_AB_unique" ON "_AnonUserCompletedChecklistItems"("A", "B");

-- CreateIndex
CREATE INDEX "_AnonUserCompletedChecklistItems_B_index" ON "_AnonUserCompletedChecklistItems"("B");

-- AddForeignKey
ALTER TABLE "Campaign" ADD CONSTRAINT "Campaign_createdByUserId_fkey" FOREIGN KEY ("createdByUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Campaign" ADD CONSTRAINT "Campaign_checklistItemId_fkey" FOREIGN KEY ("checklistItemId") REFERENCES "ChecklistItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BankCampaignCompletion" ADD CONSTRAINT "BankCampaignCompletion_anonUserId_fkey" FOREIGN KEY ("anonUserId") REFERENCES "AnonUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BankCampaignCompletion" ADD CONSTRAINT "BankCampaignCompletion_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserCompletedCampaigns" ADD FOREIGN KEY ("A") REFERENCES "Campaign"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserCompletedCampaigns" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserCompletedChecklistItems" ADD FOREIGN KEY ("A") REFERENCES "ChecklistItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserCompletedChecklistItems" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnonUserCompletedCampaigns" ADD FOREIGN KEY ("A") REFERENCES "AnonUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnonUserCompletedCampaigns" ADD FOREIGN KEY ("B") REFERENCES "Campaign"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnonUserCompletedChecklistItems" ADD FOREIGN KEY ("A") REFERENCES "AnonUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnonUserCompletedChecklistItems" ADD FOREIGN KEY ("B") REFERENCES "ChecklistItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
