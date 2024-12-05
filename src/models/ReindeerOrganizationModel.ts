import type { ReindeerOrganizations } from "@prisma/client"
import { prisma } from "../prisma"
import { ClientError } from "../utilities"
import { createPosition } from "./PositionModel"

export const getAllOrganizations = async () => {
  const allOrganizations = await prisma.reindeerOrganizations.findMany({
    include: { positions: true }
  })

  return allOrganizations
}

export const getByIdOrganization = async ({
  id
}: {
  id: ReindeerOrganizations["id"]
}) => {
  const organization = await prisma.reindeerOrganizations.findUnique({
    where: { id },
    include: { positions: true }
  })

  if (!organization)
    throw new ClientError(
      "Organization not found",
      404,
      "No Organization found with the given ID"
    )

  return organization
}

export const createOrganization = async (
  organization: ReindeerOrganizations
) => {
  const newOrganization = await prisma.reindeerOrganizations.create({
    data: {
      name: organization.name,
      isSelected: organization.isSelected,
      isAvailable: organization.isAvailable,
      positions: {
        create: organization.positions
      }
    },
    include: { positions: true }
  })

  return newOrganization
}

export const updateOrganization = async (
  id: ReindeerOrganizations["id"],
  organization: ReindeerOrganizations
) => {
  await getByIdOrganization({ id })

  return await prisma.reindeerOrganizations.update({
    where: { id },
    data: {
      name: organization.name,
      isSelected: organization.isSelected,
      isAvailable: organization.isAvailable,
      positions: {
        deleteMany: {},
        create: organization.positions
      }
    },
    include: { positions: true }
  })
}

export const deleteOrganization = async ({
  id
}: {
  id: ReindeerOrganizations["id"]
}) => {
  await getByIdOrganization({ id })

  await prisma.positions.deleteMany({ where: { organizationId: id } })

  return prisma.reindeerOrganizations.delete({ where: { id } })
}
