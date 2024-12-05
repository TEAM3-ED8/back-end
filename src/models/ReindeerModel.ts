import { Reindeer, type Reindeers } from "@prisma/client"
import { prisma } from "../prisma"
import { ClientError } from "../utilities"

export const createReindeer = async (reindeer: Reindeers) => {
  return await prisma.reindeers.create({
    data: reindeer
  })
}

export const getByIdReineer = async ({ id }: { id: Reindeers["id"] }) => {
  const reindeer = await prisma.reindeers.findUnique({
    where: { id }
  })

  if (!reindeer)
    throw new ClientError(
      "Reindeer not found",
      404,
      "No Reindeer found with the given ID"
    )

  return reindeer
}

export const getAllReindeer = async () => {
  return await prisma.reindeers.findMany()
}
export const updateReindeer = async (
  id: Reindeers["id"],
  reindeer: Reindeers
) => {
  await getByIdReineer({ id })

  return await prisma.reindeers.update({
    where: { id },
    data: reindeer
  })
}

export const deleteReindeer = async ({ id }: { id: Reindeers["id"] }) => {
  await getByIdReineer({ id })

  return await prisma.reindeers.delete({
    where: { id }
  })
}

export const getIncludesID = async ({ ids }: { ids: number[] }) => {
  return await prisma.reindeers.findMany({ where: { id: { in: ids } } })
}
