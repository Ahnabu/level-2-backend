import express from 'express';
import {  StudentControllers } from './student.controller';


const router = express.Router();

router.get("/students", StudentControllers.getAllStudents)


router.get("/students/:studentId", StudentControllers.getSingleStudent)

router.delete("/students/:studentId", StudentControllers.deleteAStudent)

router.patch("/students/:studentId", StudentControllers.updateAStudent)

export const StudentRoutes = router;