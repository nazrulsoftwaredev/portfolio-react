import mongoose from "mongoose";
import { ActivityModel, type ActivityKind } from "../models/Activity.js";

type LogClientActivityParams = {
  clientId: string;
  actorUserId: string;
  kind: ActivityKind;
  label: string;
  meta?: Record<string, unknown>;
};

export const logClientActivity = async ({
  clientId,
  actorUserId,
  kind,
  label,
  meta,
}: LogClientActivityParams) => {
  return ActivityModel.create({
    clientId: new mongoose.Types.ObjectId(clientId),
    entityType: "client",
    entityId: new mongoose.Types.ObjectId(clientId),
    kind,
    label,
    actorUserId: new mongoose.Types.ObjectId(actorUserId),
    ...(meta ? { meta } : {}),
  });
};
