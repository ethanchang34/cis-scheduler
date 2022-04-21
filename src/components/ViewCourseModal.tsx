import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { Course } from "../interfaces/Course";
import { CourseModalContent } from "./CourseModalContent";
import { EditModalContent } from "./EditModalContent";

export const ViewCourseModal = ({
    show,
    handleClose,
    code,
    editCourse,
    modifiedCourses
}: {
    show: boolean;
    handleClose: () => void;
    code: string;
    editCourse: (newCourse: Course) => void;
    modifiedCourses: Record<string, Course>;
}) => {
    const [editing, setEditing] = useState(false);

    const course = modifiedCourses[code];

    const flipEditing = () => {
        setEditing(!editing);
    };

    const handleTech = () => {
        editCourse({ ...course, tech: !course.tech });
    };

    return (
        <div>
            <Modal
                show={show}
                onHide={handleClose}
                animation={false}
                dialogClassName="my-modal"
            >
                {!editing && (
                    <CourseModalContent
                        course={course}
                        handleTech={handleTech}
                        flipEditing={flipEditing}
                    ></CourseModalContent>
                )}
                {editing && (
                    <EditModalContent
                        course={course}
                        editCourse={editCourse}
                        flipEditing={flipEditing}
                    ></EditModalContent>
                )}
            </Modal>
        </div>
    );
};
