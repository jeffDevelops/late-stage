/*
  Warnings:

  - You are about to drop the column `checklistItemId` on the `Campaign` table. All the data in the column will be lost.
  - You are about to drop the `ChecklistItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_UserCompletedChecklistItems` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Campaign" DROP CONSTRAINT "Campaign_checklistItemId_fkey";

-- DropForeignKey
ALTER TABLE "_UserCompletedChecklistItems" DROP CONSTRAINT "_UserCompletedChecklistItems_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserCompletedChecklistItems" DROP CONSTRAINT "_UserCompletedChecklistItems_B_fkey";

-- DropIndex
DROP INDEX "Campaign_checklistItemId_key";

-- AlterTable
ALTER TABLE "Campaign" DROP COLUMN "checklistItemId",
ADD COLUMN     "checklistTitle" TEXT;

-- DropTable
DROP TABLE "ChecklistItem";

-- DropTable
DROP TABLE "_UserCompletedChecklistItems";
