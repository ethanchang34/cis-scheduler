import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Semester } from "../interfaces/Semester";
import { Course } from "../interfaces/Course";
import { CourseList } from "./CourseList";

export const SemesterView = ({
    semester,
    deleteSemester,
    editSemester,
    modifiedCourses
}: {
    semester: Semester;
    deleteSemester: (id: number) => void;
    editSemester: (id: number, newSemester: Semester) => void;
    modifiedCourses: Record<string, Course>;
}) => {
    const [courseInput, setCourseInput] = useState<string>("");

    const numToSemester: Record<number, string> = {
        0: "fall",
        1: "winter",
        2: "spring",
        3: "summer"
    };

    function addCourse(code: string) {
        //event.target.value (course.code) --> map to Course in the datafile --> that Course feeds into this fn arg
        //other way is to pass the course.code into this function and then inside the function find the Course from datafile
        if (modifiedCourses[code] !== undefined) {
            editSemester(semester.id, {
                ...semester,
                courses: [...semester.courses, code]
            });
        } else {
            alert("Invalid course");
        }
        setCourseInput("");
    }

    function deleteCourse(code: string) {
        editSemester(semester.id, {
            ...semester,
            courses: semester.courses.filter(
                (course: string): boolean => course !== code
            )
        });
    }

    /* function editCourse(code: string, newCourse: string) {
        editSemester(semester.id, {
            ...semester,
            courses: semester.courses.map((course: string): string =>
                course === code ? newCourse : course
            )
        });
    } */
    //might be used later when we want the functionality of storing courses in some sidebar (refer to user stories)

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
                modifiedCourses={modifiedCourses}
            ></CourseList>
            <Form.Group controlId="addCourse">
                <Form.Label>Add Course</Form.Label>
                <Form.Control
                    placeholder="Enter course code (e.g. CISC 108)"
                    value={courseInput}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setCourseInput(event.target.value)
                    }
                ></Form.Control>
                <Button type="submit" onClick={() => addCourse(courseInput)}>
                    Add Course
                </Button>
            </Form.Group>
            <form
                onSubmit={(event: React.SyntheticEvent) => {
                    event.preventDefault();
                    addCourse(courseInput);
                }}
            >
                <input
                    type="text"
                    placeholder="Enter course code (e.g. CISC 108)"
                    value={courseInput}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setCourseInput(event.target.value)
                    }
                />
                <button type="submit">Submit</button>
            </form>

            <Button onClick={clearCourses}>Clear Courses</Button>
            <Button onClick={() => deleteSemester(semester.id)}>
                - Delete Semester
            </Button>
        </div>
    );
};
