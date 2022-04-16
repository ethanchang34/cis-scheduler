import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Course } from "../interfaces/Course";

export const CourseView = ({
    course,
    deleteCourse,
    editCourse
}: {
    course: Course;
    deleteCourse: (code: string) => void;
    editCourse: (code: string) => void;
}) => {
    const [editing, setEditing] = useState<boolean>(false);

    function changeEditing() {
        setEditing(!editing);
    }

    return editing ? (
        <></>
    ) : (
        <div>
            <p>Department:{course.department}</p>
            <p>Id:{course.id}</p>
            <p>Tech?:{course.tech}</p>
            <p>Breadth?:{course.breadth}</p>
            <p>Credits:{course.credits}</p>
        </div>
    );
};
