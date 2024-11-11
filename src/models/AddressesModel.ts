import type { Addresses } from "@prisma/client"
import { prisma } from "../prisma"

export const getAllAddress = async () => {
  return await prisma.addresses.findMany()
}

export const getByIdAddress = async ({ id }: Addresses["id"]) => {
  return await prisma.addresses.findUnique({ where: { id } })
}

export const createAddress = async (address: Addresses) => {
  return await prisma.addresses.create({ data: address })
}

export const updateAddress = async (
  id: Addresses["id"],
  address: Addresses
) => {
  return await prisma.addresses.update({
    where: { id },
    data: address
  })
}

export const deleteAddress = async ({ id }: Addresses["id"]) => {
  return await prisma.addresses.delete({ where: { id } })
}