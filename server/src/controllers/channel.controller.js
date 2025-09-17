import { includes } from "zod";
import { AppError } from "../config/customerror.js";
import { prisma } from "../lib/prisma.js";
const avatars = [
    "https://api.dicebear.com/7.x/adventurer/svg?seed=John",
    "https://api.dicebear.com/7.x/bottts/svg?seed=Jane",
    "https://api.dicebear.com/7.x/pixel-art/svg?seed=Alex",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
    "https://api.dicebear.com/7.x/fun-emoji/svg?seed=Mike",
    "https://api.dicebear.com/7.x/thumbs/svg?seed=Sarah",
    "https://i.pravatar.cc/150?img=1",
    "https://i.pravatar.cc/150?img=5",
    "https://i.pravatar.cc/150?img=10",
    "https://i.pravatar.cc/150?img=15",
    "https://i.pravatar.cc/150?img=20",
    "https://i.pravatar.cc/150?img=30",
];

function getRandomAvatar() {
    return avatars[Math.floor(Math.random() * avatars.length)];
}

export const getChannels = async (req, res, next) => {
    try {
        const channels = await prisma.channel.findMany({
            where: {
                OR: [
                    { visibility: "PUBLIC" },
                    {
                        members: {
                            some: {
                                userId: req.user.id,
                            },
                        },
                    },
                    {
                        createdById: req.user.id,
                    },
                ],
            },
            include: {
                createdBy: { select: { firebaseUid: true } },
                messages: {
                    include: {
                        threadReplies: {
                            orderBy: { createdAt: "asc" },
                            include: {
                                author: {
                                    select: {
                                        profile: {
                                            select: {
                                                displayName: true,
                                                picture: true,
                                            },
                                        },
                                    },
                                },
                            },
                        },
                        author: {
                            select: {
                                profile: {
                                    select: {
                                        displayName: true,
                                        picture: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });

        const formattedChannels = channels.map((channel) => {
            if (channel.name === "anonymous") {
                if (channel.createdBy?.profile) {
                    channel.createdBy.profile.picture = getRandomAvatar();
                    channel.createdBy.profile.displayName = ""; // clear username
                }
                channel.messages = channel.messages.map((msg) => {
                    if (msg.author?.profile) {
                        msg.author.profile.picture = getRandomAvatar();
                        msg.author.profile.displayName = "";
                    }

                    // override authors of thread replies
                    msg.threadReplies = msg.threadReplies.map((reply) => {
                        if (reply.author?.profile) {
                            reply.author.profile.picture = getRandomAvatar();
                            reply.author.profile.displayName = "";
                        }
                        return reply;
                    });

                    return msg;
                });
            }
            return channel;
        });

        res.status(200).json(formattedChannels);
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
        const { name, visibility, slug } = req.body;
        const channel = await prisma.channel.create({
            data: { name, visibility, slug, createdById: req.user.id },
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

export const addMember = async (req, res, next) => {
    try {
        const { channelId, userId, role } = req.body;

        if (!channelId || !userId) {
            return res
                .status(400)
                .json({ error: "channelId and userId are required" });
        }

        const channel = await prisma.channel.findUnique({
            where: { id: channelId },
            include: {
                members: true,
            },
        });

        if (!channel) {
            throw new AppError("Channel not found", 404);
        }

        const isOwner = channel.createdById === req.user.id;
        console.log(isOwner);
        const _member = channel.members.find((m) => m.userId == req.user.id);
        const isAdmin = _member?.role === "ADMIN";

        if (!isOwner && !isAdmin) {
            return res
                .status(403)
                .json({ error: "Not authorized to add members" });
        }

        if (!channel) {
            return res.status(404).json({ error: "Channel not found" });
        }
        const existing = await prisma.channelMember.findUnique({
            where: {
                channelId_userId: {
                    channelId,
                    userId,
                },
            },
        });

        if (existing) {
            return res
                .status(409)
                .json({ error: "User is already a member of this channel" });
        }

        const member = await prisma.channelMember.create({
            data: {
                channelId,
                userId,
                role: role || "MEMBER",
            },
            include: {
                user: {
                    select: { profile: true },
                },
            },
        });

        return res.status(201).json({
            message: "Member added successfully",
            member,
        });
    } catch (error) {
        next(error);
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

// GET /api/users/search?q=john
export const listofProfile = async (req, res, next) => {
    try {
        const { q } = req.query;
        if (!q) return res.json([]);

        const users = await prisma.user.findMany({
            where: {
                OR: [
                    { username: { contains: q, mode: "insensitive" } },
                    {
                        email: { contains: q, mode: "insensitive" },
                    },
                    {
                        matricNo: { contains: q, mode: "insensitive" },
                    },
                ],
            },
            select: {
                profile: true,
                email: true,
                id: true,
            },
            take: 10,
        });

        res.json({ data: users, message: "Success" });
    } catch (err) {
        next(err);
    }
};

export const replyToMessage = async (req, res, next) => {
    try {
        const { content, attachments } = req.body || {};
        const { messageId } = req.params;
        const userId = req.user.id;

        const rootMessage = await prisma.message.findUnique({
            where: { id: messageId },
        });

        if (!rootMessage) {
            return res.status(404).json({ message: "Root message not found" });
        }

        const reply = await prisma.message.create({
            data: {
                content,
                attachments: attachments || [],
                channelId: rootMessage.channelId, // 🔑 reuse root channel
                authorId: userId,
                threadRootId: messageId,
            },
            include: {
                author: {
                    include: { profile: true }, // ✅ proper include
                },
                threadRoot: true,
            },
        });

        return res.status(201).json({ message: "Reply created", data: reply });
    } catch (err) {
        next(err);
    }
};
