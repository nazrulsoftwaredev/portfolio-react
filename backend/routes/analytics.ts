import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { ClientModel } from "../models/Client.js";
import { sendError, sendSuccess } from "../utils/responses.js";

const router = Router();

router.use(requireAuth);

router.get("/overview", async (req, res, next) => {
  try {
    const authUserId = req.authUser?.id;
    if (!authUserId) {
      return sendError(res, 401, "UNAUTHORIZED", "Authentication required");
    }

    const clients = await ClientModel.find({
      ownerUserId: authUserId,
    });

    const totalRevenue = clients.reduce((sum, client) => sum + client.value, 0);
    const activeClients = clients.filter(
      (client) => client.status === "Active",
    ).length;
    const retention =
      clients.length === 0
        ? 0
        : Math.round((activeClients / clients.length) * 100);

    return sendSuccess(res, 200, {
      metrics: [
        {
          label: "Revenue",
          value: `$${totalRevenue.toLocaleString("en-US")}`,
          change: 12,
          trend: "up",
        },
        { label: "Clients", value: clients.length, change: 6, trend: "up" },
        { label: "Retention", value: `${retention}%`, change: 2, trend: "up" },
        {
          label: "Churn",
          value: `${Math.max(1, 100 - retention)}%`,
          change: -1,
          trend: "down",
        },
      ],
      chartData: [
        { month: "Jan", value: 62 },
        { month: "Feb", value: 71 },
        { month: "Mar", value: 76 },
        { month: "Apr", value: 84 },
        { month: "May", value: 88 },
        { month: "Jun", value: 93 },
      ],
    });
  } catch (error) {
    return next(error);
  }
});

export default router;
