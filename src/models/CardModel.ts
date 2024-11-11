
import { Card } from "@prisma/client"
import { prisma } from "../prisma"


export type createCardType = Omit<Card, "id" | "children"| "create_at">
export const createCard = async (data: createCardType) => {
  return await prisma.card.create({ data })
}
export const getByIdCard = async ({ id }: { id: number }) => {
  return await prisma.card.findUnique({ where: { id } })
}
export const getAllCards = async () => {
  return await prisma.card.findMany()
}
export const deleteCard = async ({
  id,
  currentValue
}: {
  id: number
  currentValue: boolean
}) => {
  return await prisma.card.update({
    where: { id },
    data: {
      isRead: !currentValue
    }
  })
}
