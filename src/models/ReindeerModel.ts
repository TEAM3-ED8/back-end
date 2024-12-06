import { type Reindeers, type Skills } from "@prisma/client"
import { prisma } from "../prisma"
import { ClientError } from "../utilities"

export const getAllReindeer = async () => {
  return await prisma.reindeers.findMany({
    include: { skills: true }
  })
}

export const getByIdReineer = async ({ id }: { id: Reindeers["id"] }) => {
  const reindeer = await prisma.reindeers.findUnique({
    where: { id },
    include: { skills: true }
  })

  if (!reindeer)
    throw new ClientError(
      "Reindeer not found",
      404,
      "No Reindeer found with the given ID"
    )

  return reindeer
}

export const createReindeer = async (reindeer: Omit<Reindeers, 'id'> & { skills: Omit<Skills, 'id' | 'reindeerId'>[] }) => {
  return await prisma.reindeers.create({
    data: {
      name: reindeer.name,
      type: reindeer.type,
      skills: {
        create: reindeer.skills
      }
    },
    include: { skills: true }
  })
}

export const updateReindeer = async (
  id: Reindeers["id"],
  reindeer: Omit<Reindeers, 'id'> & { skills: Omit<Skills, 'id' | 'reindeerId'>[] }
) => {
  await getByIdReineer({ id })

  return await prisma.reindeers.update({
    where: { id },
    data: {
      name: reindeer.name,
      type: reindeer.type,
      skills: {
        deleteMany: {},
        create: reindeer.skills
      }
    },
    include: { skills: true }
  })
}

export const deleteReindeer = async ({ id }: { id: Reindeers["id"] }) => {
  await getByIdReineer({ id })

  await prisma.skills.deleteMany({ where: { reindeerId: id } })

  return await prisma.reindeers.delete({
    where: { id }
  })
}

export const getIncludesID = async ({ ids }: { ids: number[] }) => {
  return await prisma.reindeers.findMany({ where: { id: { in: ids } } })
}

