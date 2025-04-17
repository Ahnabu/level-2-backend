import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AcademicSemesterServices } from "./academicSemester.service";


const createAcademicSemester = catchAsync(async (req, res) => {
    const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(req.body);
    
    sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Academic Semester created successfully",
    data: result,
})
})

const getAllAcademicSemesters = catchAsync(async (req, res) => {
    const result = await AcademicSemesterServices.academicSemester();
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Academic Semester retrieved successfully",
        data: result,
    })
})

const getSingleAcademicSemester = catchAsync(async (req, res) => {
    const id = req.params.id;
    const result = await AcademicSemesterServices.getAcademicSemesterById(id);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Academic Semester retrieved successfully",
        data: result,
    })
})

const updateAcademicSemester = catchAsync(async (req, res) => {
    const id = req.params.id;
    const result = await AcademicSemesterServices.updateAcademicSemesterById(id, req.body);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Academic Semester updated successfully",
        data: result,
    })
})

export const AcademicSemesterControllers = {
    createAcademicSemester,
    getAllAcademicSemesters,
    getSingleAcademicSemester,
    updateAcademicSemester,
}