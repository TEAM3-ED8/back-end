import type { Skills } from "@prisma/client";

interface Reindeers {
  id: number;
  name: string;
  type: string;
  skills?: Skills[]
}