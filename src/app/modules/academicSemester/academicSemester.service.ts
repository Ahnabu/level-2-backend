import { TAcademicSemester } from "./academicSemester.interface";
import { AcademicSemester } from "./academicSemester.model";
type TAcademicSemesterNameCodeMapper ={
    [key: string]: string
}
//semester code validation
    const academicSemesterNameCodeMapper: TAcademicSemesterNameCodeMapper = {
        Autumn: '01',
        Summer: '02',
        Fall: '03',
    }

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
    
    
    // if (!academicSemesterNameCodeMapper[payload.name]) {
    //     throw new Error('Invalid semester name');
    // }
    if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
        throw new Error('Invalid semester code for the given name');
    }
    const result = await AcademicSemester.create(payload);

    return result; 
}

const academicSemester =async ( )=> {
    const result = await AcademicSemester.find().sort({ createdAt: -1 });
    return result;
}

const getAcademicSemesterById = async (id: string) => {
    const result = await AcademicSemester.findById(id);
    return result;
}

const updateAcademicSemesterById =  async (
    id: string,
    payload: Partial<TAcademicSemester>,
  ) => {
    if (
      payload.name &&
      payload.code &&
      academicSemesterNameCodeMapper[payload.name] !== payload.code
    ) {
      throw new Error('Invalid Semester Code');
    }
  
    const result = await AcademicSemester.findOneAndUpdate({ _id: id }, payload, {
      new: true,
    });
    return result;
  };


export const AcademicSemesterServices = {
    createAcademicSemesterIntoDB,
    academicSemester,
    getAcademicSemesterById,
    updateAcademicSemesterById,
}