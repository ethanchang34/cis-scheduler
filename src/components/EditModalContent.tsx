import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import styled from "styled-components";
import { Course } from "../interfaces/Course";

const FormDiv = styled.div`
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
                <FormDiv>
                    <Form.Group controlId="Edit Title">
                        <Form.Label>
                            <b>Edit Title:</b>
                        </Form.Label>
                        <Form.Control
                            value={newCourse.name}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                                setNewCourse({
                                    ...newCourse,
                                    name: e.target.value
                                });
                            }}
                        />
                    </Form.Group>
                </FormDiv>
                <FormDiv>
                    <Form.Group controlId="Edit Description">
                        <Form.Label>
                            <b>Edit Description:</b>
                        </Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={newCourse.descr}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                                setNewCourse({
                                    ...newCourse,
                                    descr: e.target.value
                                });
                            }}
                        />
                    </Form.Group>
                </FormDiv>
                <FormDiv>
                    <Form.Group controlId="Edit Credits">
                        <Form.Label>
                            <b>Edit Credits:</b>
                        </Form.Label>
                        <Form.Control
                            type="number"
                            value={newCourse.credits}
                            style={{ width: "4.5rem" }}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                                setNewCourse({
                                    ...newCourse,
                                    credits: parseInt(e.target.value)
                                });
                            }}
                        />
                    </Form.Group>
                </FormDiv>
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
