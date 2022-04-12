import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Semester } from "../interfaces/Semester";
import { Course } from "../interfaces/Course";
import { CourseView } from "./CourseView";

export const SemesterView = ({ semester }: { semester: Semester }) => {
    const [editing, setEditing] = useState<boolean>(false);

    function changeEditing() {
        setEditing(!editing);
    }

    return editing ? (
        <></>
    ) : (
        <div>
            {semester.courses.map((course: Course) => (
                <div key={course.id} className="bg-light border m-2 p-2">
                    <CourseView course={course}></CourseView>
                </div>
            ))}
        </div>
    );
};
