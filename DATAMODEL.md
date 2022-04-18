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
active: boolean; //we aren't adding and deleting semesters, we're activating and de-activating semesters
courses: int[]

Course:
guid: number
department: String
id: number
tech: boolean
breadth: boolean
preReq: int[]
credits: number
