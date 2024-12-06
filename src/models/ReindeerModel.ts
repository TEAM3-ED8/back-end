import type { Reindeers } from "../interfaces"
import { prisma } from "../prisma"
import { ClientError } from "../utilities"

export const getAllReindeer = async () => {
  return await prisma.reindeers.findMany({
    include: { skills: true }
  })
}

export const getByIdReindeer = async ({ id }: { id: Reindeers["id"] }) => {
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

export const createReindeer = async (reindeer: Omit<Reindeers, "id">) => {
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
  reindeer: Reindeers
) => {
  const { id, name, type, skills } = reindeer

  await getByIdReindeer({ id })

  return await prisma.reindeers.update({
    where: { id },
    data: {
      name,
      type,
      skills: {
        deleteMany: {},
        create: skills
      }
    },
    include: { skills: true }
  })
}

export const deleteReindeer = async ({ id }: { id: Reindeers["id"] }) => {
  await getByIdReindeer({ id })

  await prisma.skills.deleteMany({ where: { reindeerId: id } })

  return await prisma.reindeers.delete({
    where: { id }
  })
}

export const getIncludesID = async ({ ids }: { ids: number[] }) => {
  return await prisma.reindeers.findMany({ where: { id: { in: ids } } })
}
