import { TAcademicDepartment } from './academicDepartment.interface';
import { model, Schema } from "mongoose";

const academicDepartmentSchema =
 new Schema<TAcademicDepartment>({
     name: {
         type: String,
         required: true,
         unique: true,
            
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

academicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
    const query = this.getQuery();
    const isDepartmentExists = await AcademicDepartment.findOne(query);
    if (!isDepartmentExists) {
        throw new Error("Academic Department already exists");
    }
    next();
    
})

export const AcademicDepartment = model<TAcademicDepartment>("AcademicDepartment", academicDepartmentSchema)
