import { Reindeer } from "@prisma/client"
import { prisma } from "../prisma"

export const createRange = async ({
  range,
  reindeers
}: {
  range: string
  reindeers: Omit<Reindeer, "range_id">[]
}) => {
  return await prisma.range.create({
    data: {
      range,
      reindeer: {
        create: reindeers
      }
    }
  })
}
export const getByIdRange = async ({ id }: { id: number }) => {
  return await prisma.range.findUnique({
    where: { id },
    include: { reindeer: true }
  })
}
export const getAllRange = async () => {
  return await prisma.range.findMany({
    include: { reindeer: true }
  })
}
export const updateRange = async ({
  id,
  range,
  reindeers
}: {
  id: number
  range: string
  reindeers: Omit<Reindeer, "range_id">[]
}) => {
  return await prisma.range.update({
    where: { id },
    data: {
      range,
      reindeer: {
        upsert: reindeers.map(({ id, ...reindeer }) => ({
          where: { id },
          update: reindeer,
          create: reindeer
        }))
      }
    }
  })
}
export const deleteRange = async ({ id }: { id: number }) => {
  return await prisma.range.delete({
    where: { id },
    include: { reindeer: true }
  })
}
