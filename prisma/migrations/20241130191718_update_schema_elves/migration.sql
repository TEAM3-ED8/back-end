/*
  Warnings:

  - You are about to drop the column `mail` on the `Elves` table. All the data in the column will be lost.
  - Added the required column `email` to the `Elves` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Elves" DROP COLUMN "mail",
ADD COLUMN     "email" TEXT NOT NULL;
