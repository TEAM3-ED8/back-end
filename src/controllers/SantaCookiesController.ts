import { Request, Response, NextFunction } from "express"
import { createCookie, consumeCookies, getCookieStats } from "./../models/SantaCookiesModel"
import { catchedAsync } from "../utilities"
import { prisma } from "../prisma"

export const create = catchedAsync(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { name, calories, quantity, consumed, totalCalories } = req.body

  if (!name || !calories || !quantity) {
    res.status(400).json({
      error: "Nombre, calorías y cantidad son requeridos"
    })
    return
  }

  try {
    const newCookie = await createCookie({
      name,
      calories,
      quantity,
      consumed,
      totalCalories
    })

    res.status(201).json({
      message: "Galleta creada exitosamente",
      data: newCookie
    })
  } catch (error) {
    next(error)
  }
})

export const consume = catchedAsync(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { cookieId, amount } = req.body

  if (!cookieId || !amount) {
    res.status(400).json({
      error: "cookieId y amount son requeridos"
    })
    return
  }

  try {
    const [updatedCookie] = await consumeCookies(cookieId, amount)

    res.status(200).json({
      message: "Galletas consumidas exitosamente",
      data: updatedCookie
    })
  } catch (error) {
    if (error instanceof Error && error.message === "Galletas insuficientes") {
      res.status(400).json({
        error: error.message
      })
      return
    }
    next(error)
  }
})

export const getStats = catchedAsync(async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const stats = await getCookieStats()
    res.status(200).json({
      message: "Estadísticas obtenidas exitosamente",
      data: stats
    })
  } catch (error) {
    next(error)
  }
})

export const getAllCookies = catchedAsync(async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const cookies = await prisma.cookie.findMany({
      include: {
        santa: true
      }
    })
    res.status(200).json({
      message: "Galletas obtenidas exitosamente",
      data: cookies
    })
  } catch (error) {
    next(error)
  }
})