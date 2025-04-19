import { z } from "zod";


const createAcademicDeptValidation = z.object({
    body: z.object({
        name: z.string({
            required_error: "Name is required",
            invalid_type_error: "Name must be a string",
        }),
        academicFaculty: z.string({
            required_error: "Academic Faculty is required",
            invalid_type_error: "Academic Faculty must be a string",
        }),
    }),
})

const updateAcademicDeptValidation = z.object({
    body: z.object({
        name: z.string({
            required_error: "Name is required",
            invalid_type_error: "Name must be a string",
        }),
        academicFaculty: z.string({
            required_error: "Academic Faculty is required",
            invalid_type_error: "Academic Faculty must be a string",
        }),
    }),
})

export const AcademicDepartmentValidation = {
    createAcademicDeptValidation,
    updateAcademicDeptValidation,
}