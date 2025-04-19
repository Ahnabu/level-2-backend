import { TStudent } from './student.interface';
import { Student } from './student.model';

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
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};

const updateAStudent = async (id: string, student:TStudent) => {
  const result = await Student.findOneAndUpdate({ id }, student);
  return result;
  
   

}

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
  updateAStudent,
};