import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AcademicDepartmentServices } from "./academicDepartment.service";


const createAcademicDept = catchAsync(async (req, res) => {
    const result = await AcademicDepartmentServices.createAcademicDeptToDB(req.body);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Academic Department created successfully",
        data: result,
    })
})

const getAllAcademicDept = catchAsync(async (req, res) => {
    const result = await AcademicDepartmentServices.getAllAcademicDept();
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Academic Department retrieved successfully",
        data: result,
    })
})

const getSingleAcademicDept = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await AcademicDepartmentServices.getSingleAcademicDept(id);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Academic Department retrieved successfully",
        data: result,
    })
})

const updateAcademicDept = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await AcademicDepartmentServices.updateAcademicDeptToDB(id, req.body);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Academic Department updated successfully",
        data: result,
    })
})

const deleteAcademicDept = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await AcademicDepartmentServices.deleteAcademicDeptFromDB(id);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Academic Department deleted successfully",
        data: result,
    })
})

export const AcademicDepartmentControllers = {
    createAcademicDept,
    getAllAcademicDept,
    getSingleAcademicDept,
    updateAcademicDept,
    deleteAcademicDept,
}