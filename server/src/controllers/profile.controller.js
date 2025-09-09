import { includes } from "zod";
import { prisma } from "../lib/prisma.js";

export const profileController = async (req, res, next) => {
    const email = req?.user?.id;
    const { xnd } = req?.query;

    let profile;
    if (xnd !== "null") {
        profile = await prisma.profile.findUnique({
            where: { displayName: xnd },
            include: {
                user: { omit: { password: true, id: true } },
            },
        });
    } else {
        profile = await prisma.profile.findUnique({
            where: { userId: email },
            include: {
                user: { omit: { password: true, id: true } },
            },
        });
    }

    return res.status(200).json({
        data: { ...profile },
        message: "Profile fetched successfully",
    });
};
