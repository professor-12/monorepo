import { ZodError } from "zod";
import { formatZodError } from "../utils/index.js";
import { AppError } from "../config/customerror.js";
export const errorHandler = (error, req, res, next) => {
    if (error instanceof ZodError) {
        return res.status(400).json({ message: formatZodError(error.message) });
    }
    if (error.name === "UnauthorizedError") {
        return res.status(401).json({ message: "Unauthorized access" });
    }
    if (error instanceof SyntaxError) {
        return res.status(400).json({ message: "Bad Request" });
    }
    if (error instanceof AppError) {
        return res.status(error.status).json({ message: error.message });
    }
    return res
        .status(error.status ?? 500)
        .json({ message: error.message || "Internal Server Error" });
};
