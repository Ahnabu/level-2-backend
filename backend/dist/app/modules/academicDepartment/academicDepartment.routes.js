"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicDepartmentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_constant_1 = require("../user/user.constant");
const academicDepartment_validation_1 = require("./academicDepartment.validation");
const academicDepartment_controllers_1 = require("./academicDepartment.controllers");
const router = express_1.default.Router();
router.post('/create-academic-department', (0, auth_1.default)(user_constant_1.USER_ROLE.superAdmin, user_constant_1.USER_ROLE.admin), (0, validateRequest_1.default)(academicDepartment_validation_1.AcademicDepartmentValidation.createAcademicDepartmentValidationSchema), academicDepartment_controllers_1.AcademicDepartmentControllers.createAcademicDepartment);
router.get('/:departmentId', (0, auth_1.default)(user_constant_1.USER_ROLE.superAdmin, user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.faculty, user_constant_1.USER_ROLE.student), academicDepartment_controllers_1.AcademicDepartmentControllers.getSingleAcademicDepartment);
router.patch('/:departmentId', (0, auth_1.default)(user_constant_1.USER_ROLE.superAdmin, user_constant_1.USER_ROLE.admin), (0, validateRequest_1.default)(academicDepartment_validation_1.AcademicDepartmentValidation.updateAcademicDepartmentValidationSchema), academicDepartment_controllers_1.AcademicDepartmentControllers.updateAcademicDepartment);
router.get('/', (0, auth_1.default)(user_constant_1.USER_ROLE.superAdmin, user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.faculty, user_constant_1.USER_ROLE.student), academicDepartment_controllers_1.AcademicDepartmentControllers.getAllAcademicDepartments);
exports.AcademicDepartmentRoutes = router;
