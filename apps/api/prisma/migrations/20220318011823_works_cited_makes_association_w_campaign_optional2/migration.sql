-- DropForeignKey
ALTER TABLE "WorkCited" DROP CONSTRAINT "WorkCited_campaignId_fkey";

-- AlterTable
ALTER TABLE "WorkCited" ALTER COLUMN "campaignId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "WorkCited" ADD CONSTRAINT "WorkCited_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE SET NULL ON UPDATE CASCADE;
