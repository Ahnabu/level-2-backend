
import { z } from "zod";
import { months } from './academicSemester.model';


const createAcademicSemesterValidationSchema = z.object({
    body: z.object({
        name: z.enum(["Autumn", "Summer", "Fall"]),
        code: z.enum(["01", "02", "03"]),
        year: z.string(),
        startMonth: z.enum([...months] as [string, ...string[]]),
        endMonth: z.enum([...months] as [string, ...string[]]),
        startDate: z.string(),
        endDate: z.string(),
    })
    
})

const updateAcademicSemesterValidationSchema = z.object({
    body: z.object({
        name: z.enum(["Autumn", "Summer", "Fall"]).optional(),
        code: z.enum(["01", "02", "03"]).optional(),
        year: z.string().optional(),
        startMonth: z.enum([...months] as [string, ...string[]]).optional(),
        endMonth: z.enum([...months] as [string, ...string[]]).optional(),
        startDate: z.string().optional(),
        endDate: z.string().optional(),
    })
})

export const AcademicSemesterValidations = {
    createAcademicSemesterValidationSchema,
    updateAcademicSemesterValidationSchema,
}