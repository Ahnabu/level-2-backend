"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicSemesterValidations = void 0;
const zod_1 = require("zod");
const academicSemester_constant_1 = require("./academicSemester.constant");
// import { months } from './academicSemester.model';
const createAcademicSemesterValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.enum(["Autumn", "Summer", "Fall"]),
        code: zod_1.z.enum(["01", "02", "03"]),
        year: zod_1.z.string(),
        startMonth: zod_1.z.enum([...academicSemester_constant_1.Months]),
        endMonth: zod_1.z.enum([...academicSemester_constant_1.Months]),
        startDate: zod_1.z.string(),
        endDate: zod_1.z.string(),
    })
});
const updateAcademicSemesterValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.enum(["Autumn", "Summer", "Fall"]).optional(),
        code: zod_1.z.enum(["01", "02", "03"]).optional(),
        year: zod_1.z.string().optional(),
        startMonth: zod_1.z.enum([...academicSemester_constant_1.Months]).optional(),
        endMonth: zod_1.z.enum([...academicSemester_constant_1.Months]).optional(),
        startDate: zod_1.z.string().optional(),
        endDate: zod_1.z.string().optional(),
    })
});
exports.AcademicSemesterValidations = {
    createAcademicSemesterValidationSchema,
    updateAcademicSemesterValidationSchema,
};
