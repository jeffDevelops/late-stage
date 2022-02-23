/*
  Warnings:

  - Added the required column `isAnonymous` to the `BankExodusCompletion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BankExodusCompletion" ADD COLUMN     "isAnonymous" BOOLEAN NOT NULL;
