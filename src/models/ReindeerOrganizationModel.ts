import type { ReindeerOrganizations, Positions } from "@prisma/client"
import { prisma } from "../prisma"
import { ClientError } from "../utilities"

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
  organization: Omit<ReindeerOrganizations, 'id'> & { positions: Omit<Positions, 'id' | 'organizationId'>[] }
) => {
  if (organization.isSelected) {
    await prisma.reindeerOrganizations.updateMany({
      where: { isSelected: true },
      data: { isSelected: false }
    });
  }

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
  organization: Omit<ReindeerOrganizations, 'id'> & { positions: Omit<Positions, 'id' | 'organizationId'>[] }
) => {
  await getByIdOrganization({ id })

  if (organization.isSelected) {
    await prisma.reindeerOrganizations.updateMany({
      where: { isSelected: true, id: { not: id } },
      data: { isSelected: false }
    });
  }

  return await prisma.reindeerOrganizations.update({
    where: { id },
    data: {
      name: organization.name,
      isSelected: organization.isSelected,
      isAvailable: organization.isAvailable,
      positions: {
        deleteMany: {},
        create: organization.positions.map(({ position, reindeerId }) => ({
          position,
          reindeerId
        }))
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

