import { prisma } from "../lib/prisma.js";

export const getChannels = async (req, res, next) => {
    try {
        const channels = await prisma.channel.findMany({
            where: { visibility: "PUBLIC" },
            take: 5, // limit results to test
            include: {
                messages: {
                    include: {
                        threadReplies: true,
                        author: {
                            select: {
                                profile: true,
                            },
                        },
                    },
                },
            },
        });

        res.status(200).json(channels);
    } catch (err) {
        next(err);
    }
};

// GET single channel by id
export const getChannel = async (req, res, next) => {
    try {
        const { id } = req.params;
        const channel = await prisma.channel.findUnique({
            where: { id: Number(id) },
            include: { messages: true },
        });
        if (!channel)
            return res.status(404).json({ error: "Channel not found" });
        res.json(channel);
    } catch (err) {
        next(err);
    }
};

// CREATE channel
export const createChannel = async (req, res, next) => {
    try {
        const { name, topic, visibility } = req.body;
        const channel = await prisma.channel.create({
            data: { name, topic },
        });
        res.status(201).json(channel);
    } catch (err) {
        next(err);
    }
};

// UPDATE channel
export const updateChannel = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, topic } = req.body;
        const channel = await prisma.channel.update({
            where: { id: Number(id) },
            data: { name, topic },
        });
        res.json(channel);
    } catch (err) {
        next(err);
    }
};

// DELETE channel
export const deleteChannel = async (req, res, next) => {
    try {
        const { id } = req.params;
        await prisma.channel.delete({
            where: { id: Number(id) },
        });
        res.status(204).end();
    } catch (err) {
        next(err);
    }
};
