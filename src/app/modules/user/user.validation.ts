import { z } from "zod";


const userSchema = z.object({
    // id: z.string(),
    password: z.string({
        invalid_type_error: "Password must be characters",
    }).min(6, { message: "Password should be at least 6 characters long" }).max(20, { message: "Password should be at most 20 characters long" }).optional( ),
    // needsPasswordChange: z.boolean().optional().default(true),
    // role: z.enum(["admin", "student", "faculty"]),
    status: z.enum(["in-progress", "blocked"]).default("in-progress"),
    //isDeleted: z.boolean().optional().default(false),
})

export const UserValidation = {
    createUserValidationSchema: userSchema,
}