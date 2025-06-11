import { Router } from "express";
import { StudentRoutes } from "../modules/student/student.route";
import { UserRoutes } from "../modules/user/user.route";
import { AcademicSemesterRoutes } from "../modules/academicSemester/academicSemester.routes";
import { AcademicFacultyRoutes } from "../modules/academicFaculty/academicFaculty.routes";
import { AcademicDepartmentRoutes } from "../modules/academicDepartment/academicDepartment.routes";
import { FacultyRoutes } from "../modules/faculty/faculty.route";
import { AdminRoutes } from "../modules/admin/admin.route";
import { CourseRoutes } from "../modules/course/course.route";
import { semesterRegistrationRoutes } from "../modules/semesterRegistration/semesterRegistration.route";
import { offeredCourseRoutes } from "../modules/offeredCourse/offeredCourse.routes";
import { AuthRoutes } from "../modules/auth/auth.route";
import { EnrolledCourseRoutes } from "../modules/enrolledCourse/enrolledCourse.route";

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
    {
        path: '/faculties',
        route: FacultyRoutes,
    },
    {
        path: '/admin',
        route: AdminRoutes,
    },
    {
        path: '/Course',
        route: CourseRoutes,
    },
    {
        path: '/semester-registration',
        route: semesterRegistrationRoutes
    },
    {
        path: '/offered-courses',
        route: offeredCourseRoutes,
    },
    {
        path: '/auth',
        route: AuthRoutes,
    },
    {
        path: '/enrolled-courses',
        route: EnrolledCourseRoutes,
    },
]
moduleRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

export default router;