import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { User } from "./user.model";

const findLastStudentId = async () => {
    const lastStudent = await User.findOne({ role: "student" }, {
        id: 1,
        _id: 0,
    }).sort({ createdAt: -1 }).lean();
    return lastStudent?.id || undefined;
}

export const generateStudentId = async (payload: TAcademicSemester) => {
    let currentId = (0).toString();
    const lastStudentId = await findLastStudentId();

    if (lastStudentId) {
        const lastStudentSemesterCode = lastStudentId.slice(4, 6);
        const lastStudentYear = lastStudentId.slice(0, 4);
        const currentSemesterCode = payload.code;
        const currentYear = payload.year.toString();
        if (lastStudentId && lastStudentSemesterCode && currentSemesterCode === lastStudentYear && currentYear) {
currentId = lastStudentId.slice(6);
        }
    }
    let incrementedId = (parseInt(currentId) + 1).toString().padStart(4, '0')
    incrementedId = `${payload.year}${payload.code}${incrementedId}`;
    return incrementedId
}

export const findLastFacultyId = async () => {
    const lastFaculty = await User.findOne(
      {
        role: 'faculty',
      },
      {
        id: 1,
        _id: 0,
      },
    )
      .sort({
        createdAt: -1,
      })
      .lean();
  
    return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined;
  };
  
  export const generateFacultyId = async () => {
    let currentId = (0).toString();
    const lastFacultyId = await findLastFacultyId();
  
    if (lastFacultyId) {
      currentId = lastFacultyId.substring(2);
    }
  
    let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
  
    incrementId = `F-${incrementId}`;
  
    return incrementId;
  };
  