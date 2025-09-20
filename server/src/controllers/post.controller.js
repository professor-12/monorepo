import { prisma } from "../lib/prisma.js";
import { v2 as cloudinary } from "cloudinary";

export const post = async (req, res, next) => {
    const data = await prisma.post.findMany({
        orderBy: { createdAt: "desc" },
        include: {
            author: {
                select: {
                    profile: true,
                },
            },
            comments: {
                orderBy: { createdAt: "asc" },
                include: {
                    author: {
                        select: {
                            profile: true,
                        },
                    },
                },
            },
            reactions: {
                include: {
                    user: {
                        select: {
                            profile: true,
                            firebaseUid: true,
                        },
                    },
                },
            },
        },
    });

    return res
        .status(200)
        .json({ data, message: "Post retrieved successfully" });
};

export const handleLikePost = async (req, res, next) => {
    try {
        const { postId } = req.params;
        const userId = req?.user?.id;

        const post = await prisma.post.findUnique({
            where: { id: postId },
        });

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Check if user already liked the post
        const existingLike = await prisma.reaction.findFirst({
            where: { postId, userId },
        });

        let action;
        let newLike;
        if (existingLike) {
            // Unlike → remove the reaction
            await prisma.reaction.delete({
                where: { id: existingLike.id },
            });
            action = "unliked";
        } else {
            // Like → create new reaction
            newLike = await prisma.reaction.create({
                data: {
                    userId,
                    postId,
                },
                include: {
                    user: { select: { firebaseUid: true } },
                },
            });
            action = "liked";
        }

        // Get updated like count
        const likesCount = await prisma.reaction.count({
            where: { postId },
        });

        return res.status(200).json({
            message: `Post ${action}`,
            action,
            likesCount,
            data: { ...newLike, userId: req.user.firebaseUid },
        });
    } catch (error) {
        next(error);
    }
};

export const createPost = async (req, res, next) => {
    try {
        const authorId = req.user.id;
        const { title, content, tags, mentions } = req.body;

        if (!content || !authorId) {
            return res
                .status(400)
                .json({ error: "title and authorId are required" });
        }

        let thumbnailUrl = null;

        if (req.file) {
            const b64 = Buffer.from(req.file.buffer).toString("base64");
            const dataURI = "data:" + req.file.mimetype + ";base64," + b64;

            const uploadRes = await cloudinary.uploader.upload(dataURI, {
                folder: "posts",
            });

            thumbnailUrl = uploadRes.secure_url;
        }

        const post = await prisma.post.create({
            data: {
                authorId,
                title: content,
                content: content || null,
                thumbnail: thumbnailUrl,
                tags: tags ? JSON.parse(tags) : [],
                mentions: mentions ? JSON.parse(mentions) : [],
            },
        });

        res.status(201).json(post);
    } catch (error) {
        console.error("Error creating post:", error);
        if (error instanceof multer.MulterError) {
            if (error.code === "LIMIT_FILE_SIZE") {
                return res
                    .status(400)
                    .json({ error: "File too large (max 5MB)" });
            }
        }

        next(error);
    }
};

export const getMyPost = async (req, res, next) => {
    try {
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const posts = await prisma.post.findMany({
            where: { authorId: userId },
            orderBy: { createdAt: "desc" },
            include: {
                comments: true,
                reactions: true,
                author: {
                    select: {
                        id: true,
                        profile: true,
                        email: true,
                        username: true,
                    },
                },
            },
        });

        res.status(200).json({
            data: posts,
            message: "Posts retrieved successfully",
        });
    } catch (error) {
        console.error("Error fetching my posts:", error);
        next(error);
    }
};

export const deletePost = async (req, res, next) => {
    const userId = req.user.id;

    const id = req.params.postId;

    await prisma.post.delete({ where: { id, authorId: userId } });

    return res.status(200).json({ message: "Post deleted successfully" });
};
