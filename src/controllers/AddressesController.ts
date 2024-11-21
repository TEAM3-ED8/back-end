import type { Addresses } from "@prisma/client";
import type {Request, Response } from "express";
import { catchedAsync } from "../utilities/catchedAsync";
import { dataResponse } from "../utilities/data-response";
import { ClientError } from "../utilities/errors";
import { filterLatestSearches, getByIdAddress, createAddress, updateAddress, deleteAddress } from "./../models/AddressesModel";
import { prisma } from "../prisma";

export const getAll = async (req: Request, res: Response) => {
  const { limit } = req.query;

  if (isNaN(Number(limit)) || !limit) {
    throw new ClientError("Invalid limit", 400, "Limit must be a Number");
  }

  let allAddresses: Addresses[] = [];

  if (limit) {
    allAddresses = await filterLatestSearches({ limit: Number(limit) });
  } else {
    allAddresses = await prisma.addresses.findMany();
  }

  dataResponse(res, 200, allAddresses, "Addresses obtained successfully");
};

export const getById = catchedAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const address: Addresses = await getByIdAddress({ id: Number(id) });
    dataResponse(res, 200, address, "Address successfully obtained");
  }
);

export const create = async (req: Request, res: Response) => {
  const address: Addresses = req.body;

  if (
    !address.country ||
    !address.city ||
    !address.code ||
    !address.search_date
  ) {
    throw new ClientError(
      "All fields are required",
      400,
      "Missing required fields"
    );
  }

  const createdAddress: Addresses = await createAddress(address);
  dataResponse(res, 201, createdAddress, "Address created successfully");
};

export const update = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (isNaN(Number(id)))
    throw new ClientError("Invalid ID", 400, "ID must be a Number");

  const address: Addresses = req.body;

  if (
    !address.country ||
    !address.city ||
    !address.code ||
    !address.search_date
  ) {
    throw new ClientError(
      "All fields are required",
      400,
      "Missing required fields"
    );
  }

  const updatedAddress: Addresses = await updateAddress(Number(id), address);
  dataResponse(res, 200, updatedAddress, "Address updated successfully");
};

export const remove = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (id && isNaN(Number(id)))
    throw new ClientError("Invalid ID", 400, "ID must be a Number");

  const deletedAddress = await deleteAddress({ id: Number(id) });
  dataResponse(res, 200, deletedAddress, "Address deleted successfully");
};