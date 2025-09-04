import { prisma } from "../lib/prisma.js";

export const post = async (req, res, next) => {
    const data = await prisma.post.findMany({
        include: {
            author: {
                select: {
                    profile: true,
                },
            },
            comments: {
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
