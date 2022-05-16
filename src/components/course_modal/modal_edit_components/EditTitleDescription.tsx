import React from "react";
import { Form } from "react-bootstrap";
import { FormDiv } from "./EditModalContent";
import { Course } from "../../../interfaces/Course";

export const EditTitleDescription = ({
    newCourse,
    setNewCourse
}: {
    newCourse: Course;
    setNewCourse: (newCourse: Course) => void;
}) => {
    return (
        <>
            {" "}
            <FormDiv>
                <Form.Group controlId="Edit Title">
                    <Form.Label>
                        <b>Edit Title:</b>
                    </Form.Label>
                    <Form.Control
                        value={newCourse.name}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
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
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setNewCourse({
                                ...newCourse,
                                descr: e.target.value
                            });
                        }}
                    />
                </Form.Group>
            </FormDiv>
        </>
    );
};
