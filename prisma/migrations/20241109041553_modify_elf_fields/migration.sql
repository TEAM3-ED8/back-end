/*
  Warnings:

  - Added the required column `isDeleted` to the `Elves` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Elves" ADD COLUMN     "isDeleted" BOOLEAN NOT NULL;
