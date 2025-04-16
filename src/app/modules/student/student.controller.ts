import {  Request, Response } from 'express';
import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import { StudentServices } from './student.service';
import catchAsync from '../../utils/catchAsync';

const getSingleStudent = catchAsync (async (
  req: Request,
  res: Response,

) => {
  const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentFromDB(studentId);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student is retrieved succesfully',
      data: result,
    });
});
const getAllStudents = catchAsync(async (
  req: Request,
  res: Response,

) => {

    const result = await StudentServices.getAllStudentsFromDB();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student are retrieved succesfully',
      data: result,
    });
 

});

const deleteStudent = catchAsync(async (
  req: Request,
  res: Response,

) => {

    const { studentId } = req.params;
    const result = await StudentServices.deleteStudentFromDB(studentId);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student is deleted succesfully',
      data: result,
    });
 
});


const updateAStudent = catchAsync(async (req: Request, res: Response) => {
      const { studentId } = req.params;
      const { student: studentData } = req.body;

      const result = await StudentServices.updateAStudent(studentId, studentData);

      res.status(200).json({
          success: true,
          message: 'Student is updated successfully',
          data: result,
      });
 })


export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
  updateAStudent,
};