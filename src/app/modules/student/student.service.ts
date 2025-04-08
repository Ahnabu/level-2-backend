import { StudentModel } from './student.model';
import { Student } from './student.interface';

const createStudentIntoDB = async (student: Student) => {
  const result = await StudentModel.create(student);
  return result;
};

const getAllStudentsFromDB = async () => {
  const result = await StudentModel.find();
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await StudentModel.findOne({ id });
  return result;
};

const deleteAStudentFromDB = async (id: string) => {
    const result = await StudentModel.findOneAndDelete({ id });
    return result;
};
    
const updateAStudent = async (id: string, student:Student) => {
    const result = await StudentModel.findOneAndUpdate({ id }, student);
    return result;
    
     
 
 }
export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
    deleteAStudentFromDB,
    updateAStudent,
};