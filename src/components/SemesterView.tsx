import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Semester } from "../interfaces/Semester";
import { Course } from "../interfaces/Course";
import { CourseList } from "./CourseList";

export const SemesterView = ({
    semester,
    addSemester,
    deleteSemester,
    editSemester
}: {
    semester: Semester;
    addSemester: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    deleteSemester: (id: number) => void;
    editSemester: (id: number, newSemester: Semester) => void;
}) => {
    const numToSemester: Record<number, string> = {
        0: "fall",
        1: "winter",
        2: "spring",
        3: "summer"
    };

    function addCourse(code: string) {
        editSemester(semester.id, {
            ...semester,
            courses: [
                ...semester.courses,
                {
                    code: code,
                    subjectArea: code.replace(/[^a-zA-Z]+/g, ""),
                    number: code
                }
            ]
        });
    }

    function deleteCourse(code: string) {}

    function editCourse(code: string) {}

    return (
        <div>
            <p>{numToSemester[semester.id]}</p>
            <p>Semester ID: {semester.id}</p>
            <CourseList
                courses={semester.courses}
                deleteCourse={deleteCourse}
                editCourse={editCourse}
            ></CourseList>
            {semester.courses.map((course: Course) => (
                <div key={course.id} className="bg-light border m-2 p-2"></div>
            ))}
            <Button onClick={() => addCourse}>+ Add Course</Button>
            <Button onClick={() => deleteSemester(semester.id)}>
                - Delete Semester
            </Button>
        </div>
    );
};
