"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const student_route_1 = require("../modules/student/student.route");
const user_route_1 = require("../modules/user/user.route");
const academicSemester_routes_1 = require("../modules/academicSemester/academicSemester.routes");
const academicFaculty_routes_1 = require("../modules/academicFaculty/academicFaculty.routes");
const academicDepartment_routes_1 = require("../modules/academicDepartment/academicDepartment.routes");
const faculty_route_1 = require("../modules/faculty/faculty.route");
const admin_route_1 = require("../modules/admin/admin.route");
const couse_route_1 = require("../modules/course/couse.route");
const semesterRegistration_route_1 = require("../modules/semesterRegistration/semesterRegistration.route");
const offeredCourse_routes_1 = require("../modules/offeredCourse/offeredCourse.routes");
const auth_route_1 = require("../modules/auth/auth.route");
const enrolledCourse_route_1 = require("../modules/enrolledCourse/enrolledCourse.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/students',
        route: student_route_1.StudentRoutes,
    },
    {
        path: '/users',
        route: user_route_1.UserRoutes,
    },
    {
        path: '/academic-semesters',
        route: academicSemester_routes_1.AcademicSemesterRoutes,
    },
    {
        path: '/academic-faculty',
        route: academicFaculty_routes_1.AcademicFacultyRoutes,
    },
    {
        path: '/academic-department',
        route: academicDepartment_routes_1.AcademicDepartmentRoutes,
    },
    {
        path: '/faculties',
        route: faculty_route_1.FacultyRoutes,
    },
    {
        path: '/admin',
        route: admin_route_1.AdminRoutes,
    },
    {
        path: '/Course',
        route: couse_route_1.CourseRoutes,
    },
    {
        path: '/semester-registration',
        route: semesterRegistration_route_1.semesterRegistrationRoutes
    },
    {
        path: '/offered-courses',
        route: offeredCourse_routes_1.offeredCourseRoutes,
    },
    {
        path: '/auth',
        route: auth_route_1.AuthRoutes,
    },
    {
        path: '/enrolled-courses',
        route: enrolledCourse_route_1.EnrolledCourseRoutes,
    },
];
moduleRoutes.forEach((route) => {
    router.use(route.path, route.route);
});
exports.default = router;
