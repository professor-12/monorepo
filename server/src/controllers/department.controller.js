import { prisma } from "../lib/prisma";

const createDepartment = async (req, res, next) => {
    await prisma.department.create;
};
