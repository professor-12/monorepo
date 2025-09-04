import { z } from "zod";

const required = z.string().min(1, "This field is required");

export const loginSchema = z.object({
    email: required.email("Enter a valid email"),
    password: required.min(6, "Password must be at least 6 characters"),
});

export const registerSchema = z.object({
    email: required.email("Enter a valid email"),
    password: required.min(6, "Password must be at least 6 characters"),
    username: required,
    department: required,
    matricNo: required.regex(
        /^[A-Za-z]{3}\/[0-9]{4}\/[0-9]{3}$/,
        "Invalid matric number format"
    ),
});
