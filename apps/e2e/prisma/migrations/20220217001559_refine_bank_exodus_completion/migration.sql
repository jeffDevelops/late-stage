/*
  Warnings:

  - You are about to drop the column `campaignSpecificFields` on the `Campaign` table. All the data in the column will be lost.
  - You are about to drop the `BankCampaignCompletion` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BankCampaignCompletion" DROP CONSTRAINT "BankCampaignCompletion_userId_fkey";

-- AlterTable
ALTER TABLE "Campaign" DROP COLUMN "campaignSpecificFields";

-- DropTable
DROP TABLE "BankCampaignCompletion";

-- CreateTable
CREATE TABLE "BankExodusCompletion" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "withdrawalReceiptImageURL" TEXT NOT NULL,
    "withdrawalAmount" DOUBLE PRECISION NOT NULL,
    "originInstitutionName" TEXT NOT NULL,
    "destinationInstitutionName" TEXT NOT NULL,
    "dontInvestInFossilFuels" BOOLEAN NOT NULL,
    "dontInvestInSLABS" BOOLEAN NOT NULL,
    "dontChargeAccountFees" BOOLEAN NOT NULL,
    "offerFairRatesToAccountHolders" BOOLEAN NOT NULL,
    "conscientiousAboutHumanRights" BOOLEAN NOT NULL,
    "other" BOOLEAN NOT NULL,
    "otherInfo" TEXT NOT NULL,

    CONSTRAINT "BankExodusCompletion_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BankExodusCompletion" ADD CONSTRAINT "BankExodusCompletion_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
