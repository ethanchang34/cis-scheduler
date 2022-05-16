import React from "react";
import { Form } from "react-bootstrap";
import { Course } from "../../../interfaces/Course";
import { FormDiv } from "./EditModalContent";

export const EditCreditPrereqRestrictions = ({
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
                <Form.Group controlId="Edit Credits">
                    <Form.Label>
                        <b>Edit Credits:</b>
                    </Form.Label>
                    <Form.Control
                        type="number"
                        value={newCourse.credits}
                        style={{ width: "4.5rem" }}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setNewCourse({
                                ...newCourse,
                                credits: parseInt(e.target.value)
                            });
                        }}
                    />
                </Form.Group>
            </FormDiv>
            <FormDiv>
                <Form.Group controlId="Edit Prereqs">
                    <Form.Label>
                        <b>Edit Prerequisites:</b>
                    </Form.Label>
                    <Form.Control
                        value={newCourse.preReq}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setNewCourse({
                                ...newCourse,
                                preReq: e.target.value
                            });
                        }}
                    />
                </Form.Group>
            </FormDiv>
            <FormDiv>
                <Form.Group controlId="Edit Restrict">
                    <Form.Label>
                        <b>Edit Restrictions:</b>
                    </Form.Label>
                    <Form.Control
                        value={newCourse.restrict}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setNewCourse({
                                ...newCourse,
                                restrict: e.target.value
                            });
                        }}
                    />
                </Form.Group>
            </FormDiv>
        </>
    );
};
