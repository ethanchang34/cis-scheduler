import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Course } from "../interfaces/Course";

export const CourseView = ({
    course,
    deleteCourse,
    editCourse
}: {
    course: string;
    deleteCourse: (code: string) => void;
    editCourse: (code: string, newCourse: string) => void;
}) => {
    //Want to insert here a map from the course (string) to the Course (object) using the data file.
    const [editing, setEditing] = useState<boolean>(false);

    function changeEditing() {
        setEditing(!editing);
    }

    return editing ? (
        <></>
    ) : (
        <div>
            <p>Code:{course.code}</p>
            <p>Credits:{course.credits}</p>
        </div>
    );
};
