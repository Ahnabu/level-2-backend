import { model, Schema } from "mongoose";
import { TAcademicSemester, TMonths } from "./academicSemester.interface";

export const months: TMonths[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
]


const AcademicSemesterSchema = new Schema<TAcademicSemester>({
    name: {
        type: String,
        enum: ["Autumn", "Summer", "Fall"],
        required: true,
    },
    year: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        enum: ["01", "02", "03"],
        required: true,
    },
    startMonth: {
        type: String,
        enum: months
    },
    endMonth: {
        type: String,
        enum: months
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    }
}, {
    timestamps: true,
}
)

AcademicSemesterSchema.pre("save", async function (next) {
    const isSemesterExists = await AcademicSemester.findOne({
        name: this.name,
        year: this.year,
        code: this.code,
    });
    if (isSemesterExists) {
        throw new Error("Academic Semester already exists!");
    }
})
export const AcademicSemester = model<TAcademicSemester>("AcademicSemester", AcademicSemesterSchema, )