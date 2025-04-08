import express from 'express';
import {  StudentControllers } from './student.controller';


const router = express.Router();


router.post('/create-student', StudentControllers.createStudent)

router.get("/", StudentControllers.getAllStudents)

router.get("/:studentId", StudentControllers.getSingleStudent)

router.delete("/delete/:studentId", StudentControllers.deleteAStudent)

router.patch("/update/:studentId", StudentControllers.updateAStudent)

export const StudentRoutes = router;