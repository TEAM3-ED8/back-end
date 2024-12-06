import type { Positions } from "@prisma/client";

interface ReindeerOrganizations {
  id: number;
  name: string;
  isSelected: boolean;
  isAvailable: boolean;
  positions: Positions[]
}