import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export interface CreateCookieInput {
  name: string
  calories: number
  quantity: number
  consumed?: number
  totalCalories?: number
}

export const createCookie = async (data: CreateCookieInput) => {
  return await prisma.cookie.create({
    data: {
      ...data,
      santa: {
        connect: { id: 1 }
      }
    }
  })
}

export const updateCookie = async (id: number, data: Partial<CreateCookieInput>) => {
  const cookie = await prisma.cookie.findUnique({
    where: { id }
  })

  if (!cookie) {
    throw new Error("Galleta no encontrada")
  }

  return await prisma.cookie.update({
    where: { id },
    data
  })
}


export const deleteCookie = async (id: number) => {
  const cookie = await prisma.cookie.findUnique({
    where: { id }
  })

  if (!cookie) {
    throw new Error("Galleta no encontrada")
  }

  return await prisma.cookie.delete({
    where: { id }
  })
}



export const consumeCookies = async (cookieId: number, amount: number) => {
  const cookie = await prisma.cookie.findUnique({
    where: { id: cookieId }
  })

  if (!cookie || cookie.quantity < amount) {
    throw new Error("Galletas insuficientes")
  }

  const totalCaloriesConsumed = cookie.calories * amount

  return await prisma.$transaction([
    prisma.cookie.update({
      where: { id: cookieId },
      data: {
        quantity: { decrement: amount },
        consumed: { increment: amount },
        totalCalories: { increment: totalCaloriesConsumed }
      }
    }),
    prisma.santaCalories.update({
      where: { id: 1 },
      data: {
        totalCookies: { increment: amount },
        totalConsumed: { increment: amount },
        totalCalories: { increment: totalCaloriesConsumed }
      }
    })
  ])
}

export const getCookieStats = async () => {
  const cookies = await prisma.cookie.findMany()
  return {
    availableCookies: cookies.reduce((sum, cookie) => sum + cookie.quantity, 0),
    consumedCookies: cookies.reduce((sum, cookie) => sum + (cookie.consumed || 0), 0),
    totalCalories: cookies.reduce((sum, cookie) => sum + (cookie.totalCalories || 0), 0)
  }
}