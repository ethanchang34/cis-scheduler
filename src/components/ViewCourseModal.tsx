import React /*{ useState }*/ from "react";
import { Modal } from "react-bootstrap";
import { Course } from "../interfaces/Course";
import { CourseModalContent } from "./CourseModalContent";

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
    const course = modifiedCourses[code];

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
                <CourseModalContent
                    course={course}
                    handleTech={handleTech}
                ></CourseModalContent>
            </Modal>
        </div>
    );
};
