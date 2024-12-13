-- AddForeignKey
ALTER TABLE "Positions" ADD CONSTRAINT "Positions_reindeerId_fkey" FOREIGN KEY ("reindeerId") REFERENCES "Reindeers"("id") ON DELETE SET NULL ON UPDATE CASCADE;
