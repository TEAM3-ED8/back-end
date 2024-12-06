import type { Skills } from "@prisma/client";

export interface Reindeers {
  id: number;
  name: string;
  type: string;
  skills?: Skills[]
}