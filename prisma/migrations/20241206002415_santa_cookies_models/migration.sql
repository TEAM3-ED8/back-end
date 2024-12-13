-- CreateTable
CREATE TABLE "SantaCalories" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "totalCookies" INTEGER NOT NULL DEFAULT 0,
    "totalConsumed" INTEGER NOT NULL DEFAULT 0,
    "totalCalories" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "SantaCalories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cookie" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "calories" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "consumed" INTEGER DEFAULT 0,
    "totalCalories" INTEGER DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "santaId" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "Cookie_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Cookie" ADD CONSTRAINT "Cookie_santaId_fkey" FOREIGN KEY ("santaId") REFERENCES "SantaCalories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
