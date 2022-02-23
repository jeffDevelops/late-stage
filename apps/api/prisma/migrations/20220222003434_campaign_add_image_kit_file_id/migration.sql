/*
  Warnings:

  - Added the required column `imageKitFileId` to the `BankExodusCompletion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BankExodusCompletion" ADD COLUMN     "imageKitFileId" TEXT NOT NULL;
