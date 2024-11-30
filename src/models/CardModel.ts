import { Card } from "@prisma/client"
import { prisma } from "../prisma"
import { ClientError } from "../utilities"

export const createCard = async (data: Card) => {
  return await prisma.card.create({ data })
}

export const getByIdCard = async ({ id }: { id: number }) => {
  const card = await prisma.card.findUnique({ where: { id } })

  if (!card)
    throw new ClientError(
      "Card not found",
      404,
      "No Card found with the given ID"
    )

  return card
}

export const getAllCards = async () => {
  return await prisma.card.findMany({
    include: {
      children: true
    },
    orderBy: {
      isRead: "asc"
    }
  })
}

export const updateCard = async (id: Card["id"], card: Card) => {
  const foundCard = await getByIdCard({ id })

  return await prisma.card.update({
    where: { id },
    data: card
  })
}
