-- AlterTable
ALTER TABLE "BankExodusCompletion" ADD COLUMN     "approvedByAdmin" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "approvedByUserId" TEXT;

-- AddForeignKey
ALTER TABLE "BankExodusCompletion" ADD CONSTRAINT "BankExodusCompletion_approvedByUserId_fkey" FOREIGN KEY ("approvedByUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
