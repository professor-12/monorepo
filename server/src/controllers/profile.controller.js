import { v2 as cloudinary } from "cloudinary";
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

export const editProfileController = async (req, res, next) => {
    try {
        const { bio, displayName } = req.body;
        const userId = req.user.id;

        let picture = null;
        if (req.file) {
            const b64 = Buffer.from(req.file.buffer).toString("base64");
            const dataURI = "data:" + req.file.mimetype + ";base64," + b64;

            const uploadRes = await cloudinary.uploader.upload(dataURI, {
                folder: "posts",
            });

            picture = uploadRes.secure_url;
        }

        const updatedProfile = await prisma.profile.update({
            where: { userId },
            data: {
                bio,
                displayName,
                ...(picture && { picture }),
            },
        });

        res.json(updatedProfile);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
