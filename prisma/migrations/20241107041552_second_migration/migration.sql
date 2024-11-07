/*
  Warnings:

  - You are about to drop the `Addresse` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Childrens" DROP CONSTRAINT "Childrens_address_id_fkey";

-- DropForeignKey
ALTER TABLE "Searches" DROP CONSTRAINT "Searches_address_id_fkey";

-- DropTable
DROP TABLE "Addresse";

-- CreateTable
CREATE TABLE "Addresses" (
    "id" SERIAL NOT NULL,
    "country" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "code" TEXT NOT NULL,

    CONSTRAINT "Addresses_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Searches" ADD CONSTRAINT "Searches_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "Addresses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Childrens" ADD CONSTRAINT "Childrens_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "Addresses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
