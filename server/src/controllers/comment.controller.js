import { prisma } from "../lib/prisma.js"; // adjust path to your prisma client
import { AppError } from "../config/customerror.js"; // your custom error handler

/**
 * POST /api/comments
 * Body: { postId: string, content: string, parentId?: string }
 * User is derived from auth middleware (req.user.id)
 */
export const sendCommentController = async (req, res, next) => {
    try {
        const userId = req.user?.id; // assuming auth middleware injects user
        const { postId, content, parentId } = req.body;

        if (!userId) {
            return next(new AppError("Unauthorized", 401));
        }
        if (!postId || !content) {
            return next(new AppError("postId and content are required", 400));
        }

        const postExists = await prisma.post.findUnique({
            where: { id: postId },
            select: { id: true },
        });

        if (!postExists) {
            return next(new AppError("Post not found", 404));
        }

        if (parentId) {
            const parentComment = await prisma.comment.findUnique({
                where: { id: parentId },
                select: { id: true, postId: true },
            });
            if (!parentComment || parentComment.postId !== postId) {
                return next(new AppError("Invalid parent comment", 400));
            }
        }

        // 4. Create the comment
        const comment = await prisma.comment.create({
            data: {
                content,
                authorId: userId,
                postId,
                parentId: parentId || null,
            },
            include: {
                author: {
                    select: {
                        profile: true,
                    },
                },
                reactions: true,
                children: true,
            },
        });

        // 5. Return created comment
        res.status(201).json({
            status: "success",
            data: comment,
        });
    } catch (err) {
        next(err);
    }
};
