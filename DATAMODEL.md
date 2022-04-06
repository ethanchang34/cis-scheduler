Big Data:
plans: Plan[],
originalCourses: Course[],
workingCourses: Course[],
requirement: Requirement

Requirements:
RequiredCourses: Course[],
nTechs: number,
nBreadths: number

Plan:
title: String
description: String
years: Year[]

Year:
semesters: Semester[4]

Semester:
courses: \*Course[]

Course:
department: String
id: number
tech: boolean
breadth: boolean
preReq: \*Course[]
credits: number
