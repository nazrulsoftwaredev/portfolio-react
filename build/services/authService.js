import bcrypt from "bcryptjs";
import { env } from "../config/environment.js";
import { UserModel } from "../models/User.js";
export const ensureBootstrapAdmin = async () => {
    const existingAdmin = await UserModel.findOne({
        email: env.ADMIN_EMAIL.toLowerCase(),
    });
    if (existingAdmin) {
        // If admin exists but is inactive, activate it
        if (!existingAdmin.isActive) {
            existingAdmin.isActive = true;
            await existingAdmin.save();
        }
        return existingAdmin;
    }
    const passwordHash = await bcrypt.hash(env.ADMIN_PASSWORD, env.BCRYPT_ROUNDS);
    return UserModel.create({
        name: "Admin",
        email: env.ADMIN_EMAIL.toLowerCase(),
        passwordHash,
        role: "admin",
        isActive: true,
    });
};
export const validateAdminCredentials = async (email, password) => {
    const user = await UserModel.findOne({
        email: email.toLowerCase(),
        isActive: true,
    });
    if (!user) {
        return null;
    }
    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
        return null;
    }
    return user;
};
export const markLoginSuccess = async (userId) => {
    await UserModel.findByIdAndUpdate(userId, { lastLoginAt: new Date() });
};
