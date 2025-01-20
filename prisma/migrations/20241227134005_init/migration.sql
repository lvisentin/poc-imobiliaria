/*
  Warnings:

  - You are about to drop the column `userId` on the `Lead` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Lead" DROP CONSTRAINT "Lead_userId_fkey";

-- AlterTable
ALTER TABLE "Lead" DROP COLUMN "userId";
