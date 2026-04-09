import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import { existsSync } from "node:fs";
import path from "node:path";
import { env } from "./config/environment.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";
import { httpLogger } from "./middleware/logging.js";
import apiRoutes from "./routes/index.js";
const app = express();
app.use(httpLogger);
app.use(helmet());
app.use(cors({
    origin: env.CORS_ORIGIN,
    credentials: true,
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", apiRoutes);
const distDir = path.resolve(process.cwd(), "dist");
const distIndex = path.join(distDir, "index.html");
if (existsSync(distDir)) {
    app.use(express.static(distDir));
}
app.use((req, res, next) => {
    if (req.path.startsWith("/api/")) {
        return next();
    }
    if (existsSync(distIndex)) {
        return res.sendFile(distIndex);
    }
    return res
        .status(500)
        .type("text/plain")
        .send("Build output not found. Run npm run build first.");
});
app.use(notFoundHandler);
app.use(errorHandler);
export default app;
