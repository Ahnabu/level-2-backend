import config from "../../config";
import { Student } from "../student/student.interface";
import { StudentModel } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";


const createStudentIntoDB = async (password: string, student: Student) => {
  //create a user object
 const user:Partial<TUser> = {}
  // if password is not provided, set default password
 
  user.password = password || config.default_password
 
  //set role
  user.role = "student"

  // set manually generated id
  user.id = '2030' + Math.floor(Math.random() * 10000).toString().padStart(4, '0')

  // create a user
  const newUser = await User.create(user);

  // create a student
  if (Object.keys(student).length > 0) {
    //set id,_id
    student.id = newUser.id;
    student.user = newUser._id;
    // create student
    const newStudent = await StudentModel.create(student);
    return newStudent
  }

};


export const UserServices = {
    createStudentIntoDB,
    };