import React from "react";
import { Stack } from "react-bootstrap";
import { Course } from "../interfaces/Course";
import { CourseView } from "./CourseView";

export const CourseList = ({
    courses,
    deleteCourse,
    editCourse
}: {
    courses: string[];
    deleteCourse: (code: string) => void;
    editCourse: (code: string, newCourse: string) => void;
}) => {
    return (
        <div>
            <Stack gap={3}>
                {courses.map((course: string) => (
                    <div key={course} className="bg-light border m-2 p-2">
                        <CourseView
                            course={course}
                            deleteCourse={deleteCourse}
                            editCourse={editCourse}
                        ></CourseView>
                    </div>
                ))}
            </Stack>
        </div>
    );
};
