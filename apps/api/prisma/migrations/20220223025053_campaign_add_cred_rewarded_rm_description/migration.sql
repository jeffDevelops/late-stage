/*
  Warnings:

  - You are about to drop the column `description` on the `Campaign` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Campaign" DROP COLUMN "description",
ADD COLUMN     "credRewarded" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "status" SET DEFAULT E'NOT_STARTED';
