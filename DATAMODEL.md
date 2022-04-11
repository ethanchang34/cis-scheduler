Big Data:
plans: Plan[],
originalCourses: Course[],
workingCourses: Course[],
requirement: Requirement

Requirements:
RequiredCourses: int[],
nTechs: number,
nBreadths: number

Plan:
id: number
title: String
description: String
years: Year[]

Year:
semesters: Semester[4]

Semester:
courses: int[]

Course:
guid: number
department: String
id: number
tech: boolean
breadth: boolean
preReq: int[]
credits: number
