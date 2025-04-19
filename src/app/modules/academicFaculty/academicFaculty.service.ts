import { TAcademicFaculty } from "./academicFaculty.interface";
import { AcademicFaculty } from "./academicFaculty.model";


const createAcademicFacultyToDB = async (payload: TAcademicFaculty) => {
    const result = await AcademicFaculty.create(payload);
    return result;
}

const getAllAcademicFaculty = async () => {
    const result = await AcademicFaculty.find().sort({ createdAt: -1 }).lean();
    return result;
}

const getSingleAcademicFaculty = async (id: string) => {
    const result = await AcademicFaculty.findById(id).lean();
    if (!result) {
        throw new Error("Academic Faculty not found");
    }
    return result;
}

const updateAcademicFacultyToDB = async (id: string, payload: Partial<TAcademicFaculty>) => {
    const result = await AcademicFaculty.findByIdAndUpdate(id, payload)
    return result;
}

const deleteAcademicFacultyFromDB = async (id: string) => {
    const result = await AcademicFaculty.findByIdAndDelete(id).lean();
    if (!result) {
        throw new Error("Academic Faculty not found");
    }
    return result;
}
export const AcademicFacultyServices = {
    createAcademicFacultyToDB,
    getAllAcademicFaculty,
    getSingleAcademicFaculty,
    updateAcademicFacultyToDB,
    deleteAcademicFacultyFromDB,
}