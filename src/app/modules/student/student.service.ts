import { StudentModel } from './student.model';
import { Student } from './student.interface';


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

  getAllStudentsFromDB,
  getSingleStudentFromDB,
    deleteAStudentFromDB,
    updateAStudent,
};