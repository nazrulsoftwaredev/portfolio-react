import mongoose from "mongoose";
import { ClientModel, type ClientStatus } from "../models/Client.js";

type ClientsListParams = {
  ownerUserId: string;
  page: number;
  pageSize: number;
  q?: string;
  status?: "All" | ClientStatus;
  sort?: "name-asc" | "name-desc" | "value-desc" | "value-asc";
};

type CreateClientInput = {
  name: string;
  industry: string;
  status: ClientStatus;
  value: number;
  avatar: string;
  email: string;
  phone: string;
  website: string;
};

type UpdateClientInput = Partial<CreateClientInput> & {
  growth?: number;
};

const sortMap: Record<
  NonNullable<ClientsListParams["sort"]>,
  Record<string, 1 | -1>
> = {
  "name-asc": { name: 1 },
  "name-desc": { name: -1 },
  "value-asc": { value: 1 },
  "value-desc": { value: -1 },
};

const generateAvatar = (name: string, email: string) => {
  const seed = encodeURIComponent(
    (name || email || "client").trim() || "client",
  );
  return `https://api.dicebear.com/7.x/identicon/svg?seed=${seed}`;
};

const normalizeClientStatus = (value?: string): ClientStatus => {
  switch ((value ?? "Active").trim().toLowerCase()) {
    case "active":
      return "Active";
    case "on hold":
      return "On Hold";
    case "inactive":
      return "Inactive";
    default:
      return "Active";
  }
};

const calculateMomentum = (
  previousValue: number,
  nextValue: number,
): number => {
  const safeNextValue = Number.isFinite(nextValue) ? Math.max(0, nextValue) : 0;

  if (!Number.isFinite(previousValue) || previousValue <= 0) {
    return safeNextValue === 0 ? 0 : 100;
  }

  const rawMomentum = ((safeNextValue - previousValue) / previousValue) * 100;
  return Math.round(rawMomentum);
};

export const ensureClientsSeed = async (ownerUserId: string) => {
  const ownerObjectId = new mongoose.Types.ObjectId(ownerUserId);
  const existingCount = await ClientModel.countDocuments({
    ownerUserId: ownerObjectId,
  });
  if (existingCount > 0) {
    return;
  }

  await ClientModel.insertMany([
    {
      name: "Acme Corp",
      industry: "Technology",
      status: "Active",
      value: 45000,
      growth: 12,
      avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=acme",
      email: "hello@acmecorp.com",
      phone: "+1-555-0101",
      website: "https://acmecorp.com",
      ownerUserId: ownerObjectId,
    },
    {
      name: "Global Tech",
      industry: "Finance",
      status: "On Hold",
      value: 12200,
      growth: -5,
      avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=global",
      email: "ops@globaltech.io",
      phone: "+1-555-0102",
      website: "https://globaltech.io",
      ownerUserId: ownerObjectId,
    },
    {
      name: "Studio X",
      industry: "Design",
      status: "Active",
      value: 8800,
      growth: 8,
      avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=studio",
      email: "team@studiox.design",
      phone: "+1-555-0103",
      website: "https://studiox.design",
      ownerUserId: ownerObjectId,
    },
  ]);
};

export const listClients = async ({
  ownerUserId,
  page,
  pageSize,
  q,
  status,
  sort,
}: ClientsListParams) => {
  const ownerObjectId = new mongoose.Types.ObjectId(ownerUserId);
  const safePage = Math.max(1, Math.floor(page || 1));
  const safePageSize = Math.min(100, Math.max(1, Math.floor(pageSize || 20)));

  const filter: Record<string, unknown> = {
    ownerUserId: ownerObjectId,
  };

  if (status && status !== "All") {
    filter.status = status;
  }

  if (q && q.trim()) {
    const escaped = q.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(escaped, "i");
    filter.$or = [{ name: regex }, { industry: regex }, { email: regex }];
  }

  const [totalItems, items] = await Promise.all([
    ClientModel.countDocuments(filter),
    ClientModel.find(filter)
      .sort(sortMap[sort ?? "value-desc"])
      .skip((safePage - 1) * safePageSize)
      .limit(safePageSize),
  ]);

  const totalPages = Math.max(1, Math.ceil(totalItems / safePageSize));

  return {
    items,
    page: Math.min(safePage, totalPages),
    pageSize: safePageSize,
    totalItems,
    totalPages,
  };
};

export const getClientById = async (ownerUserId: string, clientId: string) => {
  return ClientModel.findOne({
    _id: new mongoose.Types.ObjectId(clientId),
    ownerUserId: new mongoose.Types.ObjectId(ownerUserId),
  });
};

export const createClient = async (
  ownerUserId: string,
  input: CreateClientInput,
) => {
  return ClientModel.create({
    name: input.name.trim(),
    industry: input.industry?.trim() || "General",
    status: normalizeClientStatus(input.status),
    value: Number.isFinite(input.value) ? input.value : 0,
    // Initial momentum starts at 0 and is recalculated on value updates.
    growth: 0,
    avatar: input.avatar?.trim() || generateAvatar(input.name, input.email),
    email: input.email.toLowerCase(),
    phone: input.phone?.trim() || "",
    website: input.website?.trim() || "",
    ownerUserId: new mongoose.Types.ObjectId(ownerUserId),
  });
};

export const updateClient = async (
  ownerUserId: string,
  clientId: string,
  input: UpdateClientInput,
) => {
  const filter = {
    _id: new mongoose.Types.ObjectId(clientId),
    ownerUserId: new mongoose.Types.ObjectId(ownerUserId),
  };
  const existingClient = await ClientModel.findOne(filter);
  if (!existingClient) {
    return null;
  }

  const { growth: _ignoredGrowth, ...incoming } = input;
  const patch: UpdateClientInput = { ...incoming };

  if (patch.email) {
    patch.email = patch.email.toLowerCase();
  }

  if (typeof patch.status === "string") {
    patch.status = normalizeClientStatus(patch.status);
  }

  if (typeof patch.value === "number" && Number.isFinite(patch.value)) {
    const safeValue = Math.max(0, patch.value);
    patch.value = safeValue;
    patch.growth = calculateMomentum(existingClient.value, safeValue);
  }

  return ClientModel.findOneAndUpdate(filter, patch, { new: true });
};

export const deleteClient = async (ownerUserId: string, clientId: string) => {
  return ClientModel.findOneAndDelete({
    _id: new mongoose.Types.ObjectId(clientId),
    ownerUserId: new mongoose.Types.ObjectId(ownerUserId),
  });
};
