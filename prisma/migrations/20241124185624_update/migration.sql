/*
  Warnings:

  - You are about to drop the column `address_id` on the `Childrens` table. All the data in the column will be lost.
  - You are about to drop the `Searches` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Childrens" DROP CONSTRAINT "Childrens_address_id_fkey";

-- DropForeignKey
ALTER TABLE "Searches" DROP CONSTRAINT "Searches_address_id_fkey";

-- AlterTable
ALTER TABLE "Childrens" DROP COLUMN "address_id";

-- DropTable
DROP TABLE "Searches";
