import type { Members } from "@prisma/client"
import { prisma } from "../prisma"
import { ClientError } from "../utilities/errors"

export const getAllMembers = async () => {
  const members = await prisma.members.findMany()

  return members
}

export const getMemberById = async ({ id }: { id: Members["id"] }) => {
  const member = await prisma.members.findUnique({ where: { id } })

  if (!member) {
    throw new ClientError(
      "Member not found",
      404,
      "No Member found with the given ID."
    )
  }

  return member
}

export const createMember = async (member: Members) => {
  return await prisma.members.create({ data: member })
}
