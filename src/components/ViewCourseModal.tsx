import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { Course } from "../interfaces/Course";

export const ViewCourseModal = ({
    show,
    handleClose,
    course,
    editCourse
}: {
    show: boolean;
    handleClose: () => void;
    course: Course;
    editCourse: (newCourse: Course) => void;
}) => {
    return (
        <div>
            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Title</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h1>Modal Body</h1>
                </Modal.Body>
                <Modal.Footer>
                    <h1>Modal Footer</h1>
                </Modal.Footer>
            </Modal>
        </div>
    );
};
