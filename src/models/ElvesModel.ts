import { Elve } from "../interfaces/Elve"
import { prisma } from "../prisma"

export const createElve = async (elve: Elve) => {
  return await prisma.elves.create({ data: elve })
}
export const getByIdElve = async ({ id }: { id: number }) => {
  return await prisma.elves.findUnique({ where: { id } })
}
export const getAllElves = async () => {
  return await prisma.elves.findMany()
}
export const updateElve = async (id: number, elve: Elve) => {
  return await prisma.elves.update({
    where: { id },
    data: elve
  })
}
export const deleteElve = async ({ id }: { id: number }) => {
  return await prisma.elves.delete({
    where: { id }
  })
}
