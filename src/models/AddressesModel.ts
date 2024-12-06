import type { Addresses } from "@prisma/client"
import { prisma } from "../prisma"
import { ClientError } from "../utilities/errors"

export const getAllAddress = async () => {
  const addresses: Addresses[] = await prisma.addresses.findMany()
  return addresses
}

export const getByIdAddress = async ({ id }: { id: number }) => {
  const address = await prisma.addresses.findUnique({ where: { id } })

  if (!address)
    throw new ClientError(
      "Address not found",
      404,
      "No Address found with the given ID"
    )

  return address
}

export const createAddress = async (
  address: Omit<Addresses, "id" | "search_date">
) => {
  return await prisma.addresses.create({
    data: {
      ...address,
      lat: address.lat.toString(),
      lng: address.lng.toString()
    }
  })
}

export const updateAddress = async (
  id: Addresses["id"],
  address: Addresses
) => {
  await getByIdAddress({ id })

  return await prisma.addresses.update({
    where: { id },
    data: address
  })
}

export const deleteAddress = async ({ id }: { id: number }) => {
  await getByIdAddress({ id })

  return await prisma.addresses.delete({ where: { id } })
}

export const filterLatestSearches = async ({ limit }: { limit: number }) => {
  return await prisma.addresses.findMany({
    select: {
      id: true,
      lat: true,
      lng: true,
      display_name: true,
      search_date: true
    },
    orderBy: { search_date: "desc" },
    take: limit
  })
}

export const filterBySearchDate = async ({
  searchDate
}: {
  searchDate: Addresses["search_date"]
}) => {
  const address: Addresses | null =
    (await prisma.addresses.findFirst({
      select: {
        id: true,
        lat: true,
        lng: true,
        display_name: true,
        search_date: true
      },
      where: {
        search_date: searchDate
      }
    })) || null

  if (!address)
    throw new ClientError(
      "Address not found",
      404,
      "No Address found with the date provided"
    )
  return address
}
