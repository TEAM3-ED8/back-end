import type { Request, Response } from "express"
import {
  createMember,
  getAllMembers,
  getMemberById
} from "../models/MembersModel"
import { dataResponse } from "../utilities/data-response"
import { catchedAsync } from "../utilities/catchedAsync"
import { ClientError } from "../utilities/errors"

export const getAll = catchedAsync(async (req: Request, res: Response) => {
  const allMembers = await getAllMembers()
  dataResponse(res, 200, allMembers, "Members obtained successfully")
})

export const getById = catchedAsync(async (req: Request, res: Response) => {
  const { id } = req.params

  if (id && isNaN(Number(id))) {
    throw new ClientError("Invalid ID", 400, "The ID must be a Number.")
  }

  const member = await getMemberById({ id: Number(id) })

  dataResponse(res, 200, member, "Member successfully obtained")
})

export const create = catchedAsync(async (req: Request, res: Response) => {
  const member = req.body

  if (!member.name || !member.role || !member.message || !member.github) {
    throw new ClientError(
      "All fields are required",
      400,
      "Missing required fields"
    )
  }

  const createdMember = await createMember(member)

  dataResponse(res, 201, createdMember, "Member created successfully")
})
