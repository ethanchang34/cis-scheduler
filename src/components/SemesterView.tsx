import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Semester } from "../interfaces/Semester";
import { Course } from "../interfaces/Course";
import { CourseList } from "./CourseList";
import { SemesterList } from "./SemesterList";

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

    function addCourse(newCourse: Course) {
        //event.target.value (course.code) --> map to Course in the datafile --> that Course feeds into this fn arg
        //other way is to pass the course.code into this function and then inside the function find the Course from datafile
        editSemester(semester.id, {
            ...semester,
            courses: [...semester.courses, newCourse]
        });
    }

    function deleteCourse(code: string) {
        editSemester(semester.id, {
            ...semester,
            courses: semester.courses.filter(
                (course: Course): boolean => course.code !== code
            )
        });
    }

    function editCourse(code: string, newCourse: Course) {
        editSemester(semester.id, {
            ...semester,
            courses: semester.courses.map(
                (course: Course): Course =>
                    course.code === code ? newCourse : course
            )
        });
    }

    function clearCourses() {
        editSemester(semester.id, {
            ...semester,
            courses: []
        });
    }

    return (
        <div>
            <p>{numToSemester[semester.id]}</p>
            <p>Semester ID: {semester.id}</p>
            <CourseList
                courses={semester.courses}
                deleteCourse={deleteCourse}
                editCourse={editCourse}
            ></CourseList>
            <Button onClick={() => addCourse}>+ Add Course</Button>
            <Button onClick={clearCourses}>Clear Courses</Button>
            <Button onClick={() => deleteSemester(semester.id)}>
                - Delete Semester
            </Button>
        </div>
    );
};
