/*
  Warnings:

  - Added the required column `address` to the `Elves` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mail` to the `Elves` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Elves" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "mail" TEXT NOT NULL;
