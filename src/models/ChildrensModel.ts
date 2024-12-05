import { Childrens } from "@prisma/client"
import { prisma } from "../prisma"


export enum Behavior {
  Kind = "Kind",
  Lazy = "Lazy",
  Respectful = "Respectful",
  Curious = "Curious",
  Helpful = "Helpful"
}

export enum LevelBehavior {
  Good = "Good",
  Regular = "Regular",
  Bad = "Bad"
}

export type createChildrenType = Omit<Childrens, "id" | "cards"> & {
  behavior: Behavior;
  levelBehavior: LevelBehavior;
}


export const isValidBehavior = (behavior: string): behavior is Behavior => {
  return Object.values(Behavior).includes(behavior as Behavior)
}


export const isValidLevelBehavior = (level: string): level is LevelBehavior => {
  return Object.values(LevelBehavior).includes(level as LevelBehavior)
}


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