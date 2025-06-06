import { AcademicFacultyValidation } from './academicFaculty.validation';
import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicFacultyControllers } from './academicFaculty.controllers';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post('/create-academic-faculty',auth(USER_ROLE.superAdmin,USER_ROLE.admin), validateRequest(AcademicFacultyValidation.createAcademicFacultyValidationSchema), AcademicFacultyControllers.createAcademicFaculty)

router.get('/', AcademicFacultyControllers.getAllAcademicFaculties)

router.get('/:id', AcademicFacultyControllers.getSingleAcademicFaculty)

router.patch('/:id', validateRequest(AcademicFacultyValidation.updateAcademicFacultyValidationSchema), AcademicFacultyControllers.updateAcademicFaculty)


export const AcademicFacultyRoutes = router;