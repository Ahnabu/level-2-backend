import express from 'express';
import { AcademicDepartmentControllers } from './academicDepartment.controllers';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicDepartmentValidation } from './academicDepartment.validation';

const router = express.Router();

router.post("/create-department",validateRequest(AcademicDepartmentValidation.createAcademicDeptValidation), AcademicDepartmentControllers.createAcademicDept)
router.get("/", AcademicDepartmentControllers.getAllAcademicDept)
router.get("/:id", AcademicDepartmentControllers.getSingleAcademicDept)
router.patch("/:id",validateRequest(AcademicDepartmentValidation.updateAcademicDeptValidation), AcademicDepartmentControllers.updateAcademicDept)
router.delete("/:id", AcademicDepartmentControllers.deleteAcademicDept)


export const AcademicDepartmentRoutes = router;