/*
  Warnings:

  - You are about to drop the column `approvedByAdmin` on the `BankExodusCompletion` table. All the data in the column will be lost.
  - You are about to drop the column `approvedByUserId` on the `BankExodusCompletion` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "BankExodusCompletion" DROP CONSTRAINT "BankExodusCompletion_approvedByUserId_fkey";

-- AlterTable
ALTER TABLE "BankExodusCompletion" DROP COLUMN "approvedByAdmin",
DROP COLUMN "approvedByUserId",
ADD COLUMN     "reviewedByUserId" TEXT,
ADD COLUMN     "wasApprovedByAdmin" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "wasReviewedByAdmin" BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE "BankExodusCompletion" ADD CONSTRAINT "BankExodusCompletion_reviewedByUserId_fkey" FOREIGN KEY ("reviewedByUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
