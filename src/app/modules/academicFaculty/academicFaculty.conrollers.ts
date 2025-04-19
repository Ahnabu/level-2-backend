import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AcademicFacultyServices } from "./academicFaculty.service";


const createAcademicFaculty = catchAsync(async (req, res) => {
    const result = await AcademicFacultyServices.createAcademicFacultyToDB(req.body);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Academic Faculty created successfully",
        data: result,
    })
})

const getAllAcademicFaculty = catchAsync(async (req, res) => {
    const result = await AcademicFacultyServices.getAllAcademicFaculty();
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Academic Faculty retrieved successfully",
        data: result,
    })
})


const getSingleAcademicFaculty = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await AcademicFacultyServices.getSingleAcademicFaculty(id);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Academic Faculty retrieved successfully",
        data: result,
    })
})

const updateAcademicFaculty = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await AcademicFacultyServices.updateAcademicFacultyToDB(id, req.body);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Academic Faculty updated successfully",
        data: result,
    })
})

const deleteAcademicFaculty = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await AcademicFacultyServices.deleteAcademicFacultyFromDB(id);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Academic Faculty deleted successfully",
        data: result,
    })
})

export const AcademicFacultyControllers = {
    createAcademicFaculty,
    getAllAcademicFaculty,
    getSingleAcademicFaculty,
    updateAcademicFaculty,
    deleteAcademicFaculty,
}