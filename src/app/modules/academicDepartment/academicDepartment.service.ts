import { TAcademicDepartment } from "./academicDepartment.interface";
import { AcademicDepartment } from "./academicDepartment.model";


const createAcademicDeptToDB = async (payload:TAcademicDepartment) => {
    
    const result = await AcademicDepartment.create(payload);
    return result;
}

const getAllAcademicDept = async () => {
    const result = await AcademicDepartment.find().sort({ createdAt: -1 }).populate("academicFaculty").lean();
    return result;
}

const getSingleAcademicDept = async (id: string) => {
    const result = await AcademicDepartment.findById(id).populate("academicFaculty").lean();
    return result
}

const updateAcademicDeptToDB = async (id: string, payload: Partial<TAcademicDepartment>) => {
    const result = await AcademicDepartment.findByIdAndUpdate(id
        , payload, { new: true }).populate("academicFaculty").lean();
    return result;
}

const deleteAcademicDeptFromDB = async (id: string) => {
    const result = await AcademicDepartment.findByIdAndDelete(id).lean();
    return result
}

export const AcademicDepartmentServices = {
    createAcademicDeptToDB,
    getAllAcademicDept,
    getSingleAcademicDept,
    updateAcademicDeptToDB,
    deleteAcademicDeptFromDB,
}