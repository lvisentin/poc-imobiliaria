/*
  Warnings:

  - You are about to drop the column `message` on the `Lead` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Lead" DROP COLUMN "message";

-- AlterTable
ALTER TABLE "Property" ADD COLUMN     "bathrooms" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "bedrooms" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "hasGarage" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isFurnished" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "landArea" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "totalArea" DOUBLE PRECISION NOT NULL DEFAULT 0;
