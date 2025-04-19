import { AcademicFacultyValidation } from './academicFaculty.validation';
import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicFacultyControllers } from './academicFaculty.controllers';

const router = express.Router();

router.post('/create-faculty', validateRequest(AcademicFacultyValidation.createAcademicFacultyValidationSchema), AcademicFacultyControllers.createAcademicFaculty)

router.get('/', AcademicFacultyControllers.getAllAcademicFaculty)

router.get('/:id', AcademicFacultyControllers.getSingleAcademicFaculty)

router.patch('/:id', validateRequest(AcademicFacultyValidation.updateAcademicFacultyValidationSchema), AcademicFacultyControllers.updateAcademicFaculty)


export const AcademicFacultyRoutes = router;