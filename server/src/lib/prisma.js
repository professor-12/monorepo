import { PrismaClient } from "@prisma/client";

let prisma;

prisma = globalThis?.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;

export { prisma };
