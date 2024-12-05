/*
  Warnings:

  - You are about to drop the column `available` on the `Reindeers` table. All the data in the column will be lost.
  - You are about to drop the column `skills` on the `Reindeers` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Positions" DROP CONSTRAINT "Positions_reindeerId_fkey";

-- DropIndex
DROP INDEX "Positions_position_key";

-- AlterTable
ALTER TABLE "Reindeers" DROP COLUMN "available",
DROP COLUMN "skills";

-- CreateTable
CREATE TABLE "Skills" (
    "id" SERIAL NOT NULL,
    "skill" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "reindeerId" INTEGER NOT NULL,

    CONSTRAINT "Skills_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Skills" ADD CONSTRAINT "Skills_reindeerId_fkey" FOREIGN KEY ("reindeerId") REFERENCES "Reindeers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
