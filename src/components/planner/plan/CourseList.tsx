import React from "react";
import { Stack } from "react-bootstrap";
import { Course } from "../../../interfaces/Course";
import { CourseView } from "./CourseView";

export const CourseList = ({
    courses,
    deleteCourse,
    modifiedCourses,
    semSelected,
    addToPool
}: {
    courses: string[];
    deleteCourse: (code: string) => void;
    modifiedCourses: Record<string, Course>;
    semSelected: boolean;
    addToPool: (course: Course) => boolean;
}) => {
    return (
        <div>
            {semSelected ? (
                <Stack gap={3}>
                    {courses.map((course: string) => (
                        <div
                            key={course}
                            className="border m-1 p-3 text-black"
                            style={{
                                backgroundColor: "var(--secondary-color)",
                                borderRadius: 20
                            }}
                        >
                            <CourseView
                                course={course}
                                deleteCourse={deleteCourse}
                                modifiedCourses={modifiedCourses}
                                addToPool={addToPool}
                            ></CourseView>
                        </div>
                    ))}
                </Stack>
            ) : (
                <ul>
                    {courses.map((course: string) => (
                        <li key={course}>{modifiedCourses[course].code}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};
