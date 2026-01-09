-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "failureCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "lastCheckedAt" TIMESTAMP(3);
