Big Data:
Array of Plans[]
Array of Courses[]
Array of Requirements[]

Requirements:
RequiredCourses: Course[],
NumberOfTechs: int,
NumberOfBreadths: int

Plan:
Title: String
Description: String
Years: Year[]

Year:
Semesters: Semester[4]

Semester:
Courses: \*Course[]

Course:
department: String
id: number
tech: boolean
breadth: boolean
preReq: \*Course[]
credits: number
