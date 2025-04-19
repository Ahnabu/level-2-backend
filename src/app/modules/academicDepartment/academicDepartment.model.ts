import { TAcademicDepartment } from './academicDepartment.interface';
import { model, Schema } from "mongoose";

const academicDepartmentSchema =
 new Schema<TAcademicDepartment>({
     name: {
         type: String,
         required: true,
            
     },
     academicFaculty: {
         type: Schema.Types.ObjectId ,
         ref: "AcademicFaculty",
         required: true,
        },
 },
     {
            timestamps: true,
 })


export const AcademicDepartment = model<TAcademicDepartment>("AcademicDepartment", academicDepartmentSchema)
