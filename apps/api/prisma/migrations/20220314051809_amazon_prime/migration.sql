-- CreateTable
CREATE TABLE "AmazonPrimeCompletion" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "campaignId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cancellationImageURL" TEXT NOT NULL,
    "imageKitFileId" TEXT NOT NULL,
    "isAnonymous" BOOLEAN NOT NULL,
    "cancellationAmount" DOUBLE PRECISION NOT NULL,
    "membershipSelection" TEXT NOT NULL,
    "environmentalConcerns" BOOLEAN NOT NULL,
    "antiCompetitionConcerns" BOOLEAN NOT NULL,
    "workersRightsConcerns" BOOLEAN NOT NULL,
    "marketplaceAntitrustConcerns" BOOLEAN NOT NULL,
    "otherInfo" TEXT NOT NULL,
    "wasApprovedByAdmin" BOOLEAN NOT NULL DEFAULT false,
    "wasReviewedByAdmin" BOOLEAN NOT NULL DEFAULT false,
    "reviewedByUserId" TEXT,

    CONSTRAINT "AmazonPrimeCompletion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AmazonPrimePricing" (
    "id" TEXT NOT NULL,
    "Annually" DOUBLE PRECISION NOT NULL,
    "Monthly" DOUBLE PRECISION NOT NULL,
    "PrimeVideo" DOUBLE PRECISION NOT NULL,
    "StudentMonthly" DOUBLE PRECISION NOT NULL,
    "StudentAnnually" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "AmazonPrimePricing_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AmazonPrimeCompletion_userId_key" ON "AmazonPrimeCompletion"("userId");

-- AddForeignKey
ALTER TABLE "AmazonPrimeCompletion" ADD CONSTRAINT "AmazonPrimeCompletion_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AmazonPrimeCompletion" ADD CONSTRAINT "AmazonPrimeCompletion_reviewedByUserId_fkey" FOREIGN KEY ("reviewedByUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
