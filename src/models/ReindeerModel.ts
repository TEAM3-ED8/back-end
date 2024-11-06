import { Reindeer } from "@prisma/client"
import { prisma } from "../prisma"
export const createReindeer = async ({
  name,
  description_of_use,
  range_id
}: Reindeer) => {
  return await prisma.reindeer.create({
    data: {
      name,
      description_of_use,
      range_id
    }
  })
}

export const getByIdReineer = async ({ id }: { id: number }) => {
  return await prisma.reindeer.findUnique({
    where: { id }
  })
}

export const getAllReindeer = async () => {
  return await prisma.reindeer.findMany()
}
export const updateReindeer = async ({
  id,
  name,
  description_of_use,
  range_id
}: Reindeer) => {
  return await prisma.reindeer.update({
    where: { id },
    data: {
      name,
      description_of_use,
      range_id
    }
  })
}

export const deleteReindeer = async ({ id }: { id: number }) => {
  return await prisma.reindeer.delete({
    where: { id }
  })
}

export const getIncludesID = async ({ ids }: { ids: number[] }) => {
  return await prisma.reindeer.findMany({ where: { id: { in: ids } } })
}
