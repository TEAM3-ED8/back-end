/*
  Warnings:

  - You are about to drop the column `city` on the `Addresses` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `Addresses` table. All the data in the column will be lost.
  - You are about to drop the column `country_code` on the `Addresses` table. All the data in the column will be lost.
  - You are about to drop the column `latlng` on the `Addresses` table. All the data in the column will be lost.
  - You are about to drop the column `postcode` on the `Addresses` table. All the data in the column will be lost.
  - You are about to drop the column `region` on the `Addresses` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Addresses` table. All the data in the column will be lost.
  - Added the required column `display_name` to the `Addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lat` to the `Addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lng` to the `Addresses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Addresses" DROP COLUMN "city",
DROP COLUMN "country",
DROP COLUMN "country_code",
DROP COLUMN "latlng",
DROP COLUMN "postcode",
DROP COLUMN "region",
DROP COLUMN "type",
ADD COLUMN     "display_name" TEXT NOT NULL,
ADD COLUMN     "lat" TEXT NOT NULL,
ADD COLUMN     "lng" TEXT NOT NULL;
