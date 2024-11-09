import { Elves } from "@prisma/client"
import { prisma } from "../prisma"
export type createElveType = Omit<Elves, "id" | "isDeleted">
export type updateElveType = Partial<Elves>

export const createElve = async (data: createElveType) => {
  return await prisma.elves.create({ data })
}
export const getByIdElve = async ({ id }: { id: number }) => {
  return await prisma.elves.findUnique({ where: { id } })
}
export const getAllElves = async () => {
  return await prisma.elves.findMany()
}
export const updateElve = async (data: updateElveType) => {
  return await prisma.elves.update({
    where: { id: data.id },
    data
  })
}
export const deleteElve = async ({
  id,
  currentValue
}: {
  id: number
  currentValue: boolean
}) => {
  return await prisma.elves.update({
    where: { id },
    data: {
      isDeleted: !currentValue
    }
  })
}
