import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { Course } from "../../interfaces/Course";
import { CourseModalContent } from "../course_modal/CourseModalContent";
import { EditModalContent } from "../course_modal/EditModalContent";

export const ViewCourseModal = ({
    show,
    handleClose,
    code,
    editCourse,
    modifiedCourses,
    addToPool
}: {
    show: boolean;
    handleClose: () => void;
    code: string;
    editCourse: (newCourse: Course) => void;
    modifiedCourses: Record<string, Course>;
    addToPool: (course: Course) => boolean;
}) => {
    const [editing, setEditing] = useState(false);

    const course = modifiedCourses[code];

    const flipEditing = () => {
        setEditing(!editing);
    };

    const handleTech = () => {
        editCourse({ ...course, tech: !course.tech });
    };

    const handleMulticultural = () => {
        editCourse({ ...course, multicultural: !course.multicultural });
    };

    return (
        <div>
            <Modal
                show={show}
                onHide={() => {
                    setEditing(false);
                    handleClose();
                }}
                animation={false}
                dialogClassName="my-modal"
            >
                {!editing && (
                    <CourseModalContent
                        course={course}
                        handleTech={handleTech}
                        handleMulticultural={handleMulticultural}
                        flipEditing={flipEditing}
                        addToPool={addToPool}
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
