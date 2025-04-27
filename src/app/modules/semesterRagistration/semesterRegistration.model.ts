import mongoose from "mongoose";
import { Schema } from "mongoose";


const semesterRegistrationSchema = new mongoose.Schema(
    {
        academicSemester: {
            type: Schema.Types.ObjectId,
            ref: "AcademicSemester",
            required: true,
            unique: true,
        },
        status: {
            type: String,
            enum: ["UPCOMING", "ON_GOING", "ENDED"],
            required: true,
        },
        startDate: {
            type: Date,
            required: true,
        },
        endDate: {
            type: Date,
            required: true,
        },
        minCredit: {
            type: Number,
            required: true,
            default: 3,
        },
        maxCredit: {
            type: Number,
            required: true,
            default: 15,
        },
    },
    { timestamps: true }
);

export const SemesterRegistration = mongoose.model(
    "SemesterRegistration",
    semesterRegistrationSchema
);