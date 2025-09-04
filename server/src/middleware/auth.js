import { AppError, UnauthorizedError } from "../config/customerror.js";
import { prisma } from "../lib/prisma.js";

export const protect = async (req, res, next) => {
    console.log(req.headers);
    const userId = req.headers["authorization"]?.split(" ")[1];
    if (!userId) {
        throw new AppError("Unauthorized", 401);
    }
    const user = await prisma.user.findUnique({
        where: { firebaseUid: userId },
    });
    if (!user) {
        throw new AppError("Unauthorized", 401);
    }
    req.user = { ...user, password: undefined };
    next();
};
