/*
  Warnings:

  - You are about to drop the `Reindeer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Reindeer" DROP CONSTRAINT "Reindeer_range_id_fkey";

-- DropTable
DROP TABLE "Reindeer";

-- CreateTable
CREATE TABLE "Reindeers" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "available" BOOLEAN NOT NULL DEFAULT false,
    "skills" JSONB NOT NULL,

    CONSTRAINT "Reindeers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReindeerOrganizations" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "isSelected" BOOLEAN NOT NULL DEFAULT false,
    "isAvailable" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ReindeerOrganizations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Positions" (
    "id" SERIAL NOT NULL,
    "position" INTEGER NOT NULL,
    "reindeerId" INTEGER,
    "organizationId" INTEGER NOT NULL,

    CONSTRAINT "Positions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Positions_position_key" ON "Positions"("position");

-- CreateIndex
CREATE UNIQUE INDEX "Positions_reindeerId_key" ON "Positions"("reindeerId");

-- AddForeignKey
ALTER TABLE "Positions" ADD CONSTRAINT "Positions_reindeerId_fkey" FOREIGN KEY ("reindeerId") REFERENCES "Reindeers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Positions" ADD CONSTRAINT "Positions_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "ReindeerOrganizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
