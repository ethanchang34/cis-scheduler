import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Semester } from "../interfaces/Semester";
import { Course } from "../interfaces/Course";
import { CourseView } from "./CourseView";
import { SemesterEdit } from "./SemesterEdit";

export const SemesterView = ({
    semester,
    addSemester,
    deleteSemester
}: {
    semester: Semester;
    addSemester: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    deleteSemester: (id: number) => void;
}) => {
    const numToSemester: Record<number, string> = {
        0: "fall",
        1: "winter",
        2: "spring",
        3: "summer"
    };

    const [editing, setEditing] = useState<boolean>(false);

    function changeEditing() {
        setEditing(!editing);
    }

    return editing ? (
        <>
            {/* <SemesterEdit
            changeEditing={changeEditing}
            semester={semester}
            editSemester={editSemester}
            deleteSemester={deleteSemester}
        ></SemesterEdit> */}
        </>
    ) : (
        <div>
            <p>{numToSemester[semester.id]}</p>
            <p>Semester ID: {semester.id}</p>
            {semester.courses.map((course: Course) => (
                <div key={course.id} className="bg-light border m-2 p-2">
                    <CourseView course={course}></CourseView>
                </div>
            ))}
            <Button onClick={() => deleteSemester(semester.id)}>
                - Delete Semester
            </Button>
            <Button className="float-right" size="sm" onClick={changeEditing}>
                Edit
            </Button>
        </div>
    );
};
