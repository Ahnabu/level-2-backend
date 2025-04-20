import mongoose from 'mongoose';
import { TStudent } from './student.interface';
import { Student } from './student.model';
import AppError from '../../errors/AppError';

const getAllStudentsFromDB = async () => {
  const result = await Student.find() .populate('admissionSemester')
  .populate({
    path: 'academicDepartment',
    populate: {
      path: 'academicFaculty',
    },
  });;
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findById(id).populate("admissionSemester").populate({
    path: "academicDepartment",
    populate: "academicFaculty",
  }).lean();
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const isExist = await Student.findOne({ id });
  if (!isExist) {
    throw new AppError(404, 'Student not found');
  }
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const result = await Student.findOneAndUpdate({ id }, { isDeleted: true },
       {new:true, session}
    );
    if (!result) {
      throw new Error('Failed to delete student');
    }

    const deletedUser = await Student.findOneAndUpdate({ id }, { session }, {new:true,session});
    if (!deletedUser) {
      throw new AppError(404,'Failed to delete student');
    }

    await session.commitTransaction();
    await session.endSession();

  return result;
  }catch{
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(404,'Failed to delete student');
  }
 
};

const updateAStudent = async (id: string, student: Partial<TStudent>) => {
  
  const {name,guardian,localGuardian,... remainingStudentData} = student;

  const modifiedStudentData:Record<string,unknown> = {
...remainingStudentData
  }

  if (name && Object.keys(name).length > 0) { 
    for(const[key,value] of Object.entries(name)){
      modifiedStudentData[`name.${key}`] = value;
    }
  }
  if (guardian && Object.keys(guardian).length > 0) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedStudentData[`guardian.${key}`] = value;
    }
  }

  if (localGuardian && Object.keys(localGuardian).length > 0) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedStudentData[`localGuardian.${key}`] = value;
    }
  }
  const result = await Student.findOneAndUpdate({ id }, modifiedStudentData, {
    new: true,
    runValidators: true,
  }
  );
  return result;
  
   

}

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
  updateAStudent,
};