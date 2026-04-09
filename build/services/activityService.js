import mongoose from "mongoose";
import { ActivityModel } from "../models/Activity.js";
export const logClientActivity = async ({ clientId, actorUserId, kind, label, meta, }) => {
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
