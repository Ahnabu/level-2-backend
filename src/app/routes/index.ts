import { Router } from "express";
import { StudentRoutes } from "../modules/student/student.route";
import { UserRoutes } from "../modules/user/user.route";
import { AcademicSemesterRoutes } from "../modules/academicSemester/academicSemester.routes";
import { AcademicFacultyRoutes } from "../modules/academicFaculty/academicFaculty.routes";
import { AcademicDepartmentRoutes } from "../modules/academicDepartment/academicDepartment.routes";


const router = Router();

const moduleRoutes = [
    {
        path: '/students',
        route: StudentRoutes,
    },
    {
        path: '/users',
        route: UserRoutes,
    },
    {
        path: '/academic-semesters',
        route: AcademicSemesterRoutes,
    },
    {
        path: '/academic-faculty',
        route: AcademicFacultyRoutes,
    },
    {
        path: '/academic-department',
        route: AcademicDepartmentRoutes,
    },
]
moduleRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

export default router;