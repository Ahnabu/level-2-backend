"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnrolledCourseServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = __importDefault(require("mongoose"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const course_model_1 = require("../course/course.model");
const faculty_model_1 = require("../faculty/faculty.model");
const offeredCourse_model_1 = require("../offeredCourse/offeredCourse.model");
const semesterRegistration_model_1 = require("../semesterRegistration/semesterRegistration.model");
const student_model_1 = require("../student/student.model");
const enrolledCourse_model_1 = __importDefault(require("./enrolledCourse.model"));
const enrolledCourse_utils_1 = require("./enrolledCourse.utils");
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const createEnrolledCourseIntoDB = (userId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    /**
     * Step1: Check if the offered courses is exists
     * Step2: Check if the student is already enrolled
     * Step3: Check if the max credits exceed
     * Step4: Create an enrolled course
     */
    const { offeredCourse } = payload;
    const isOfferedCourseExists = yield offeredCourse_model_1.OfferedCourse.findById(offeredCourse);
    if (!isOfferedCourseExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Offered course not found !');
    }
    if (isOfferedCourseExists.maxCapacity <= 0) {
        throw new AppError_1.default(http_status_1.default.BAD_GATEWAY, 'Room is full !');
    }
    const student = yield student_model_1.Student.findOne({ id: userId }, { _id: 1 });
    if (!student) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Student not found !');
    }
    const isStudentAlreadyEnrolled = yield enrolledCourse_model_1.default.findOne({
        semesterRegistration: isOfferedCourseExists === null || isOfferedCourseExists === void 0 ? void 0 : isOfferedCourseExists.semesterRegistration,
        offeredCourse,
        student: student._id,
    });
    if (isStudentAlreadyEnrolled) {
        throw new AppError_1.default(http_status_1.default.CONFLICT, 'Student is already enrolled !');
    }
    // check total credits exceeds maxCredit
    const course = yield course_model_1.Course.findById(isOfferedCourseExists.course);
    const currentCredit = course === null || course === void 0 ? void 0 : course.credits;
    const semesterRegistration = yield semesterRegistration_model_1.SemesterRegistration.findById(isOfferedCourseExists.semesterRegistration).select('maxCredit');
    const maxCredit = semesterRegistration === null || semesterRegistration === void 0 ? void 0 : semesterRegistration.maxCredit;
    const enrolledCourses = yield enrolledCourse_model_1.default.aggregate([
        {
            $match: {
                semesterRegistration: isOfferedCourseExists.semesterRegistration,
                student: student._id,
            },
        },
        {
            $lookup: {
                from: 'courses',
                localField: 'course',
                foreignField: '_id',
                as: 'enrolledCourseData',
            },
        },
        {
            $unwind: '$enrolledCourseData',
        },
        {
            $group: {
                _id: null,
                totalEnrolledCredits: { $sum: '$enrolledCourseData.credits' },
            },
        },
        {
            $project: {
                _id: 0,
                totalEnrolledCredits: 1,
            },
        },
    ]);
    //  total enrolled credits + new enrolled course credit > maxCredit
    const totalCredits = enrolledCourses.length > 0 ? enrolledCourses[0].totalEnrolledCredits : 0;
    if (totalCredits && maxCredit && totalCredits + currentCredit > maxCredit) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'You have exceeded maximum number of credits !');
    }
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const result = yield enrolledCourse_model_1.default.create([
            {
                semesterRegistration: isOfferedCourseExists.semesterRegistration,
                academicSemester: isOfferedCourseExists.academicSemester,
                academicFaculty: isOfferedCourseExists.academicFaculty,
                academicDepartment: isOfferedCourseExists.academicDepartment,
                offeredCourse: offeredCourse,
                course: isOfferedCourseExists.course,
                student: student._id,
                faculty: isOfferedCourseExists.faculty,
                isEnrolled: true,
            },
        ], { session });
        if (!result) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to enroll in this cousre !');
        }
        const maxCapacity = isOfferedCourseExists.maxCapacity;
        yield offeredCourse_model_1.OfferedCourse.findByIdAndUpdate(offeredCourse, {
            maxCapacity: maxCapacity - 1,
        });
        yield session.commitTransaction();
        yield session.endSession();
        return result;
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error(err);
    }
});
const getMyEnrolledCoursesFromDB = (studentId, query) => __awaiter(void 0, void 0, void 0, function* () {
    const student = yield student_model_1.Student.findOne({ id: studentId });
    if (!student) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Student not found !');
    }
    const enrolledCourseQuery = new QueryBuilder_1.default(enrolledCourse_model_1.default.find({ student: student._id }).populate('semesterRegistration academicSemester academicFaculty academicDepartment offeredCourse course student faculty'), query)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield enrolledCourseQuery.modelQuery;
    const meta = yield enrolledCourseQuery.countTotal();
    return {
        meta,
        result,
    };
});
const updateEnrolledCourseMarksIntoDB = (facultyId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { semesterRegistration, offeredCourse, student, courseMarks } = payload;
    const isSemesterRegistrationExists = yield semesterRegistration_model_1.SemesterRegistration.findById(semesterRegistration);
    if (!isSemesterRegistrationExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Semester registration not found !');
    }
    const isOfferedCourseExists = yield offeredCourse_model_1.OfferedCourse.findById(offeredCourse);
    if (!isOfferedCourseExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Offered course not found !');
    }
    const isStudentExists = yield student_model_1.Student.findById(student);
    if (!isStudentExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Student not found !');
    }
    const faculty = yield faculty_model_1.Faculty.findOne({ id: facultyId }, { _id: 1 });
    if (!faculty) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Faculty not found !');
    }
    const isCourseBelongToFaculty = yield enrolledCourse_model_1.default.findOne({
        semesterRegistration,
        offeredCourse,
        student,
        faculty: faculty._id,
    });
    if (!isCourseBelongToFaculty) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'You are forbidden! !');
    }
    const modifiedData = Object.assign({}, courseMarks);
    if (courseMarks === null || courseMarks === void 0 ? void 0 : courseMarks.finalTerm) {
        const { classTest1, classTest2, midTerm, finalTerm } = isCourseBelongToFaculty.courseMarks;
        const totalMarks = Math.ceil(classTest1) +
            Math.ceil(midTerm) +
            Math.ceil(classTest2) +
            Math.ceil(finalTerm);
        const result = (0, enrolledCourse_utils_1.calculateGradeAndPoints)(totalMarks);
        modifiedData.grade = result.grade;
        modifiedData.gradePoints = result.gradePoints;
        modifiedData.isCompleted = true;
    }
    if (courseMarks && Object.keys(courseMarks).length) {
        for (const [key, value] of Object.entries(courseMarks)) {
            modifiedData[`courseMarks.${key}`] = value;
        }
    }
    const result = yield enrolledCourse_model_1.default.findByIdAndUpdate(isCourseBelongToFaculty._id, modifiedData, {
        new: true,
    });
    return result;
});
exports.EnrolledCourseServices = {
    createEnrolledCourseIntoDB,
    getMyEnrolledCoursesFromDB,
    updateEnrolledCourseMarksIntoDB,
};
