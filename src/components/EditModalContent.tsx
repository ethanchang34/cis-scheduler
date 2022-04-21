import React /*{ useState }*/ from "react";
import { Modal, Form, Button } from "react-bootstrap";
import styled from "styled-components";
import { Course } from "../interfaces/Course";

const FlexDiv = styled.div`
    display: flex;
    gap: 0.5rem;
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
    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title>{course.code + " " + course.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body></Modal.Body>
            <Modal.Footer>
                <Button onClick={flipEditing}>Edit</Button>
            </Modal.Footer>
        </>
    );
};
