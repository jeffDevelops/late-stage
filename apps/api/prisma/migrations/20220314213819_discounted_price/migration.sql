-- AlterTable
ALTER TABLE "AmazonPrimePricing" ADD COLUMN     "Discounted" DOUBLE PRECISION NOT NULL DEFAULT 0,
ALTER COLUMN "Annually" SET DEFAULT 0,
ALTER COLUMN "Monthly" SET DEFAULT 0,
ALTER COLUMN "PrimeVideo" SET DEFAULT 0,
ALTER COLUMN "StudentMonthly" SET DEFAULT 0,
ALTER COLUMN "StudentAnnually" SET DEFAULT 0;
