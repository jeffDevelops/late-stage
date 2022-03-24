/*
  Warnings:

  - Added the required column `actualExpiration` to the `ArtificiallyExpiredRefreshToken` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ArtificiallyExpiredRefreshToken" ADD COLUMN     "actualExpiration" TIMESTAMP(3) NOT NULL;
