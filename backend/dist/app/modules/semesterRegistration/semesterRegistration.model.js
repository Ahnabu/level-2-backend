"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SemesterRegistration = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const semesterRegistrationSchema = new mongoose_1.default.Schema({
    academicSemester: {
        type: mongoose_2.Schema.Types.ObjectId,
        ref: "AcademicSemester",
        required: true,
        unique: true,
    },
    status: {
        type: String,
        enum: ["UPCOMING", "ONGOING", "ENDED"],
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    minCredit: {
        type: Number,
        required: true,
        default: 3,
    },
    maxCredit: {
        type: Number,
        required: true,
        default: 15,
    },
}, { timestamps: true });
exports.SemesterRegistration = mongoose_1.default.model("SemesterRegistration", semesterRegistrationSchema);
