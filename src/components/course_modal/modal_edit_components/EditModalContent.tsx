import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import styled from "styled-components";
import { Course } from "../../../interfaces/Course";
import { EditTitleDescription } from "./EditTitleDescription";
import { EditSemesters } from "./EditSemesters";
import { EditBreadth } from "./EditBreadth";
import { EditCreditPrereqRestrictions } from "./EditCreditPrereqRestrictions";

export const FormDiv = styled.div`
    margin-bottom: 0.25rem;
`;

export const EditModalContent = ({
    course,
    editCourse,
    flipEditing
}: {
    course: Course;
    editCourse: (course: Course) => void;
    flipEditing: () => void;
}) => {
    const [newCourse, setNewCourse] = useState<Course>(course);

    const saveCourse = () => {
        editCourse(newCourse);
        flipEditing();
    };

    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title>{course.code}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <EditTitleDescription
                    newCourse={newCourse}
                    setNewCourse={setNewCourse}
                ></EditTitleDescription>
                <EditSemesters
                    newCourse={newCourse}
                    setNewCourse={setNewCourse}
                ></EditSemesters>
                <EditBreadth
                    newCourse={newCourse}
                    setNewCourse={setNewCourse}
                ></EditBreadth>
                <EditCreditPrereqRestrictions
                    newCourse={newCourse}
                    setNewCourse={setNewCourse}
                ></EditCreditPrereqRestrictions>
            </Modal.Body>
            <Modal.Footer>
                <Button className="btn-secondary" onClick={flipEditing}>
                    Cancel
                </Button>
                <Button onClick={saveCourse}>Save</Button>
            </Modal.Footer>
        </>
    );
};
