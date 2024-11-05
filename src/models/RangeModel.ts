import { prisma } from "../prisma"

export const createRange = async ({ range }: { range: string }) => {
  return await prisma.range.create({ data: { range } })
}
export const getByIdRange = async ({ id }: { id: number }) => {
  return await prisma.range.findUnique({ where: { id } })
}
export const getAllRange = async () => {
  return await prisma.range.findMany()
}
export const updateRange = async ({
  range,
  id
}: {
  range: string
  id: number
}) => {
  return await prisma.range.update({ data: { range }, where: { id } })
}
export const deleteRange = async ({ id }: { id: number }) => {
  return await prisma.range.delete({ where: { id } })
}
