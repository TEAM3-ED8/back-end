/*
  Warnings:

  - You are about to drop the column `lat` on the `Addresses` table. All the data in the column will be lost.
  - You are about to drop the column `lng` on the `Addresses` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Addresses" DROP COLUMN "lat",
DROP COLUMN "lng",
ADD COLUMN     "latlng" JSONB NOT NULL DEFAULT '{ "lat": "0", "lng": "0" }';
