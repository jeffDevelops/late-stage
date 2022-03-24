/*
  Warnings:

  - Added the required column `campaignId` to the `BankExodusCompletion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BankExodusCompletion" ADD COLUMN     "campaignId" TEXT NOT NULL;
