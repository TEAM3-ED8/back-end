/*
  Warnings:

  - You are about to drop the column `age` on the `Childrens` table. All the data in the column will be lost.
  - You are about to drop the column `conduct` on the `Childrens` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Childrens" DROP COLUMN "age",
DROP COLUMN "conduct",
ADD COLUMN     "behavior" TEXT NOT NULL DEFAULT 'Kind',
ADD COLUMN     "levelBehavior" TEXT NOT NULL DEFAULT 'Good';
