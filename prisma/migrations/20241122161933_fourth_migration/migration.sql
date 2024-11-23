/*
  Warnings:

  - You are about to drop the column `code` on the `Addresses` table. All the data in the column will be lost.
  - Added the required column `country_code` to the `Addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lat` to the `Addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lng` to the `Addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postcode` to the `Addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `region` to the `Addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Addresses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Addresses" DROP COLUMN "code",
ADD COLUMN     "country_code" TEXT NOT NULL,
ADD COLUMN     "lat" INTEGER NOT NULL,
ADD COLUMN     "lng" INTEGER NOT NULL,
ADD COLUMN     "postcode" TEXT NOT NULL,
ADD COLUMN     "region" TEXT NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL;
