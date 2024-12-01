import { Elves, type Prisma } from "@prisma/client"
import { prisma } from "../prisma"
import { ClientError, ServerError } from "../utilities"
export type createElveType = Omit<Elves, "id" | "isDeleted">
export type updateElveType = Partial<Elves>

export const createElve = async (data: Elves) => {
  return await prisma.elves.create({ data })
}

export const getByIdElve = async ({ id }: { id: number }) => {
  const elve = await prisma.elves.findUnique({ where: { id } })

  if (!elve)
    throw new ClientError(
      "Elve not found",
      404,
      "No Elve found with the given ID"
    )

  return elve
}

export const getAllElves = async ({
  page = 1,
  limit = 10,
  sortBy = "id",
  sortOrder = "asc",
  filter = {}
}: {
  page: number
  limit: number
  sortBy?: keyof Elves
  sortOrder?: "asc" | "desc"
  filter?: Partial<Record<keyof Elves, string>>
}) => {
  const where: Prisma.ElvesWhereInput = {}

  // Apply filters
  Object.entries(filter).forEach(([key, value]) => {
    if (value && value.trim() !== "") {
      where[key as keyof Elves] = {
        contains: value.trim(),
        mode: "insensitive"
      }
    }
  })

  const totalItems = await prisma.elves.count()
  const totalPages = totalItems > 0 ? Math.ceil(totalItems / limit) : 1

  if (page <= 0) page = 1
  if (page > totalPages) page = totalPages

  const response = await prisma.elves.findMany({
    where,
    skip: (page - 1) * limit,
    take: limit,
    orderBy: { [sortBy]: sortOrder }
  })

  return {
    data: response,
    count: totalItems || 0,
    current_page: page || 1,
    pages: totalPages || 1
  }
}

export const updateElve = async (id: Elves["id"], elve: Elves) => {
  await getByIdElve({ id })

  return await prisma.elves.update({
    where: { id },
    data: elve
  })
}

export const deleteElve = async ({
  id,
  currentValue
}: {
  id: Elves["id"]
  currentValue: Elves["isDeleted"]
}) => {
  const elfFound = await getByIdElve({ id })

  if (!elfFound) {
    throw new ClientError(
      "Elf not found",
      404,
      "No elf found with the provided ID."
    )
  }

  try {
    return await prisma.elves.update({
      where: { id },
      data: {
        isDeleted: !currentValue
      }
    })
  } catch (error) {
    throw new ServerError(
      "Failed to delete elf",
      500,
      "An error occurred during the deletion process."
    )
  }
}

export const updateElveStatus = async (
  id: Elves["id"],
  isDeleted: boolean
): Promise<Elves> => {
  const elfFound = await getByIdElve({ id })

  if (!elfFound) {
    throw new ClientError(
      "Elve not found",
      404,
      "No elve found with the provided ID."
    )
  }

  try {
    return await prisma.elves.update({
      where: { id },
      data: { isDeleted }
    })
  } catch (error) {
    throw new ServerError(
      "Failed to update elve status",
      500,
      "An error occurred during the status update process."
    )
  }
}
