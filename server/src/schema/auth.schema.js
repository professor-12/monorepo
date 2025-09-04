import { z } from "zod";
export const registerSchema = z.object({
    email: z.string().email("Enter a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    username: z.string().min(2, "Username must be at least 2 characters"),
    department: z.string().min(2, "Department must be at least 2 characters"),
    matricNo: z
        .string()
        .regex(
            /^[A-Za-z]{3}\/[0-9]{4}\/[0-9]{3}$/,
            "Invalid matric number format"
        ),
    firebaseUid: z.string(),
});
