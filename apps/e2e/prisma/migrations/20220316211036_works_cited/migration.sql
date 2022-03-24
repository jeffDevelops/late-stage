-- CreateEnum
CREATE TYPE "WorkCitedType" AS ENUM ('WEBSITE');

-- CreateTable
CREATE TABLE "WorkCited" (
    "id" TEXT NOT NULL,
    "campaignId" TEXT NOT NULL,
    "authorLastName" TEXT NOT NULL,
    "authorFirstInitial" TEXT NOT NULL,
    "publicationYear" INTEGER NOT NULL,
    "publicationMonth" TEXT NOT NULL,
    "publicationDate" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "publicationName" TEXT NOT NULL,
    "type" "WorkCitedType" NOT NULL,
    "hyperlink" TEXT,

    CONSTRAINT "WorkCited_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "WorkCited" ADD CONSTRAINT "WorkCited_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
