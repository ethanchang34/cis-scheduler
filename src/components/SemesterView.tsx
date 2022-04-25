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
    const [errorMsg, setErrorMsg] = useState<string>("");

    const numToSemester: Record<number, string> = {
        0: "fall",
        1: "winter",
        2: "spring",
        3: "summer"
    };

    function addCourse(code: string) {
        //event.target.value (course.code) --> map to Course in the datafile --> that Course feeds into this fn arg
        //other way is to pass the course.code into this function and then inside the function find the Course from datafile
        editSemester(semester.id, {
            ...semester,
            courses: [...semester.courses, code]
        });
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

    function clearCourses() {
        editSemester(semester.id, {
            ...semester,
            courses: []
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

    function courseExist(): boolean {
        if (modifiedCourses[courseInput] !== undefined) {
            //course exists in catalog
            return true;
        } else {
            setErrorMsg("Course does not exist");
            return false;
        }
    }

    function courseRepeat(): boolean {
        if (semester.courses.includes(courseInput)) {
            //course already exists in the semester
            setErrorMsg("Course is already in the semester");
            return true;
        } else {
            return false;
        }
    }

    function handleSubmit() {
        if (courseExist() && !courseRepeat()) {
            addCourse(courseInput);
            setErrorMsg("");
        }
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
                {errorMsg ? (
                    <div
                        className="error-msg"
                        style={{ fontSize: "0.9rem", color: "red" }}
                    >
                        *{errorMsg}
                    </div>
                ) : null}
                <Button type="submit" onClick={handleSubmit}>
                    Add Course
                </Button>
            </Form.Group>

            <Button onClick={clearCourses}>Clear Courses</Button>
            <Button onClick={() => deleteSemester(semester.id)}>
                Delete Semester
            </Button>
        </div>
    );
};
