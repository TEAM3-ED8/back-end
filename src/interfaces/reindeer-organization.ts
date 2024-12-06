import type { Positions } from "@prisma/client";

export interface ReindeerOrganizations {
  id: number;
  name: string;
  isSelected: boolean;
  isAvailable: boolean;
  positions: Positions[]
}