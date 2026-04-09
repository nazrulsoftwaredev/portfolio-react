import { connectDatabase } from "./config/database.js";
import { env } from "./config/environment.js";
import app from "./app.js";
import { logger } from "./utils/logger.js";

const start = async () => {
  try {
    app.listen(env.PORT, "0.0.0.0", () => {
      logger.info({ port: env.PORT }, "Server started");
    });

    void connectDatabase()
      .then(() => {
        logger.info("Database connected");
      })
      .catch((error) => {
        logger.warn(
          { err: error },
          "Database connection failed at startup; readiness will report unavailable",
        );
      });
  } catch (error) {
    logger.error({ err: error }, "Failed to start server");
    process.exit(1);
  }
};

void start();
