import { Childrens } from "@prisma/client"
import { prisma } from "../prisma"

export type createChildrenType = Omit<Childrens, "id"  | "cards">

export const createChildren = async (data: createChildrenType) => {
  return await prisma.childrens.create({ data })
}
export const getAllChildrens = async () => {
  return await prisma.childrens.findMany()
}
export const deleteChildren = async ({
    id,
    currentValue
}: {
    id: number
    currentValue: boolean
}) => {
    return await prisma.childrens.update({
        where: { id },
        data: {
            gift: !currentValue
        }
    })
}

export const updateChildrens = async ({
  id,
  data
}: {
  id: number
  data: createChildrenType
}) => {
  return await prisma.childrens.update({
    where: { id },
    data
  })
}