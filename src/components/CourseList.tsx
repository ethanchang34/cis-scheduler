import React from "react";
import { Button, Stack } from "react-bootstrap";
import { Course } from "../interfaces/Course";
import { CourseView } from "./CourseView";

export const CourseList = ({
    courses,
    deleteCourse,
    editCourse
}: {
    courses: Course[];
    deleteCourse: (code: string) => void;
    editCourse: (code: string) => void;
}) => {
    return (
        <div>
            <Stack gap={3}>
                {courses.map((course: Course) => (
                    <div key={course.id} className="bg-light border m-2 p-2">
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
