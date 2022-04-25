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
        0: "Fall",
        1: "Winter",
        2: "Spring",
        3: "Summer"
    };

    function addCourse(code: string) {
        //event.target.value (course.code) --> map to Course in the datafile --> that Course feeds into this fn arg
        //other way is to pass the course.code into this function and then inside the function find the Course from datafile
        if (modifiedCourses[code] !== undefined) {
            if (
                semester.courses.every(
                    (course: string): boolean =>
                        course !== modifiedCourses[code].code
                )
            ) {
                editSemester(semester.id, {
                    ...semester,
                    courses: [...semester.courses, code]
                });
            } else {
                alert("Course already added");
            }
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

    function semesterCreds(courses: string[]): number {
        const mappedCourses = courses.map(
            (code: string): Course => modifiedCourses[code]
        );
        return mappedCourses.reduce(
            (totalCreds: number, course: Course) => totalCreds + course.credits,
            0
        );
    }

    return (
        <div>
            <h4 className="d-inline float-left">
                {numToSemester[semester.id]}
            </h4>
            <i style={{ float: "right" }}>
                Semester Credits: {semesterCreds(semester.courses)}
            </i>
            {/*<p>Semester ID: {semester.id}</p>*/}

            <CourseList
                courses={semester.courses}
                deleteCourse={deleteCourse}
                modifiedCourses={modifiedCourses}
            ></CourseList>
            <Form.Group controlId="addCourse" className="mt-2">
                <Form.Label className="d-block">Add Course</Form.Label>
                <Form.Control
                    placeholder="Enter course code (e.g. CISC 108)"
                    value={courseInput}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setCourseInput(event.target.value)
                    }
                    style={{ display: "inline", width: "80%" }}
                ></Form.Control>
                <Button
                    className="d-inline"
                    type="submit"
                    onClick={() => addCourse(courseInput)}
                    style={{ width: "20%", float: "right" }}
                >
                    Add
                </Button>
            </Form.Group>
            <Button className="btn-secondary m-1 mt-4" onClick={clearCourses}>
                Clear Courses
            </Button>
            <Button
                className="btn-danger m-1 mt-4"
                onClick={() => deleteSemester(semester.id)}
            >
                - Delete Semester
            </Button>
        </div>
    );
};
