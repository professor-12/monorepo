import { includes } from "zod";
import { hashPassword } from "../lib/index.js";
import { prisma } from "../lib/prisma.js";
import { registerSchema } from "../schema/auth.schema.js";

export const createUser = async (req, res) => {
    const data = registerSchema.parse(req.body);

    const hashedPassword = await hashPassword(data.password, 10);
    const existingUser = await prisma.user.findUnique({
        where: {
            email: data.email,
        },
    });
    if (existingUser) {
        return res.status(409).json({
            message: "User already exists",
        });
    }

    const existingMatricNo = await prisma.user.findUnique({
        where: { matricNo: data.matricNo },
    });

    if (existingMatricNo) {
        return res.status(409).json({
            message: "Matriculation number already exists",
        });
    }

    const existingUserName = await prisma.user.findUnique({
        where: { username: data.username },
    });

    if (existingUserName) {
        return res.status(409).json({
            message: "Username already exists",
        });
    }

    const user = await prisma.user.create({
        data: {
            ...data,
            password: hashedPassword,
            department: data.department
                ? { connect: { code: data.department } }
                : undefined,
            profile: {
                create: {
                    displayName: data.username,
                },
            },
        },
        include: {
            department: true,
        },
    });

    if (user.departmentId) {
        const channel = await prisma.channel.findFirst({
            where: { name: user.department.name },
            select: { id: true },
        });

        if (channel) {
            await prisma.channelMember.create({
                data: {
                    channelId: channel.id,
                    userId: user.id,
                    role: "MEMBER",
                },
            });
        }
    }

    return res.status(201).json({
        message: "User created",
        data: { ...user, password: undefined },
    });
};
