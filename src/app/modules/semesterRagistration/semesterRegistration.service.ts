import AppError from "../../errors/AppError";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TSemesterRegistration } from "./semesterRegistration.interface";
import { SemesterRegistration } from "./semesterRegistration.model";


const createSemesterRegistrationIntoDB = async (payload: TSemesterRegistration) => {

    const academicSemester =payload?.academicSemester

    //check if the semester registration already exists
    
const isSemesterRegistrationExists = await SemesterRegistration.findById(
    academicSemester
);
if (isSemesterRegistrationExists) {
    throw new AppError(404,"Semester registration already exists for this semester.");
}

 //check if the semester registration already exists
        const existingSemesterRegistration = await AcademicSemester.findById(
            academicSemester
        );
        if (existingSemesterRegistration) {
            throw new AppError(404,"Semester registration already exists for this semester.");
        }

    //create semester registration
    const result = await SemesterRegistration.create(payload);
   return result;
    }


    