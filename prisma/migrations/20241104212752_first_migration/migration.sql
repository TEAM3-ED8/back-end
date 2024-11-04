-- CreateTable
CREATE TABLE "Elves" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "height" TEXT NOT NULL,
    "age" INTEGER NOT NULL,

    CONSTRAINT "Elves_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Addresse" (
    "id" SERIAL NOT NULL,
    "country" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "code" TEXT NOT NULL,

    CONSTRAINT "Addresse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Searches" (
    "id" SERIAL NOT NULL,
    "searched_in" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "address_id" INTEGER NOT NULL,

    CONSTRAINT "Searches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Childrens" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "conduct" TEXT NOT NULL,
    "address_id" INTEGER NOT NULL,
    "gift" BOOLEAN NOT NULL,

    CONSTRAINT "Childrens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Card" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "children_id" INTEGER NOT NULL,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Range" (
    "id" SERIAL NOT NULL,
    "range" TEXT NOT NULL,

    CONSTRAINT "Range_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reindeer" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description_of_use" TEXT NOT NULL,
    "range_id" INTEGER NOT NULL,

    CONSTRAINT "Reindeer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Searches" ADD CONSTRAINT "Searches_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "Addresse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Childrens" ADD CONSTRAINT "Childrens_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "Addresse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_children_id_fkey" FOREIGN KEY ("children_id") REFERENCES "Childrens"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reindeer" ADD CONSTRAINT "Reindeer_range_id_fkey" FOREIGN KEY ("range_id") REFERENCES "Range"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
