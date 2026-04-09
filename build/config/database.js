import mongoose from "mongoose";
import { env } from "./environment.js";
let isConnecting = false;
export const connectDatabase = async () => {
    if (mongoose.connection.readyState === 1) {
        return;
    }
    if (isConnecting) {
        return;
    }
    isConnecting = true;
    try {
        await mongoose.connect(env.MONGODB_URI, {
            dbName: env.MONGODB_DB_NAME,
            autoIndex: env.NODE_ENV !== "production",
        });
    }
    finally {
        isConnecting = false;
    }
};
export const isDatabaseReady = () => mongoose.connection.readyState === 1;
