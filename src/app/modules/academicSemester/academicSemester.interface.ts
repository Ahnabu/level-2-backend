 export type TMonths = "January" | "February" | "March" | "April" | "May" | "June" | "July" | "August" | "September" | "October" | "November" | "December";

export type TAcademicSemester = {
    name: "Autumn" | "Summer" | "Fall",
    code: "01" | "02" | "03",
    year: string,
    startMonth: TMonths,
    endMonth: TMonths,
    startDate: string,
    endDate: string,
}