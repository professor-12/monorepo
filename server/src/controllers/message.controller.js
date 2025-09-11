import { AppError } from "../config/customerror.js";
import { prisma } from "../lib/prisma.js";
import { sendMessageSchema } from "../schema/message.schema.js";

export const sendMessageContoller = async (req, res, next) => {
    const { channelId } = req.query;
    const { content } = req.body;
    const id = req.user?.id;
    const isChannelExist = await prisma.channel.findUnique({
        where: { id: channelId },
    });
    if (!isChannelExist) {
        throw new AppError("Channel not found", 400);
    }
    const safeData = sendMessageSchema.parse({
        content,
        channelId,
        authorId: id,
    });
    const data = await prisma.message.create({
        data: {
            content: safeData.content,
            author: {
                connect: { id: id },
            },
            channel: {
                connect: { id: channelId },
            },
        },
    });

    return res.status(200).json({ message: "Message sent successfully", data });
};
