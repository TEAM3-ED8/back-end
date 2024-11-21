import type { Addresses } from "@prisma/client"
import { prisma } from "../prisma"
import { ClientError, ServerError } from "../utilities/errors"

export const getAllAddress = async () => {
  const addresses: Addresses[] = await prisma.addresses.findMany()
  return addresses
}

export const getByIdAddress = async ({ id }: Addresses["id"]) => {
  const address = await prisma.addresses.findUnique({ where: { id } })

  if (!address)
    throw new ClientError(
      "Address not found",
      404,
      "No Address found with the given ID"
    )

  return address
}

export const createAddress = async (address: Addresses) => {
  return await prisma.addresses.create({ data: address })
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

export const deleteAddress = async ({ id }: Addresses["id"]) => {
  await getByIdAddress({ id })

  return await prisma.addresses.delete({ where: { id } })
}

export const filterLatestSearches = async ({ limit }: { limit: number }) => {
  return await prisma.addresses.findMany({
    select: {
      id,
      country,
      city,
      code,
      search_date
    },
    orderBy: { search_date: "desc" },
    take: limit
  })
}
