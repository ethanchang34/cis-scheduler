import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import styled from "styled-components";
import { Course } from "../../interfaces/Course";

const FlexDiv = styled.div`
    display: flex;
    gap: 0.5rem;
    margin-bottom: 0.25rem;
`;

export const CourseModalContent = ({
    course,
    handleTech,
    flipEditing,
    addToPool
}: {
    course: Course;
    handleTech: () => void;
    flipEditing: () => void;
    addToPool: (course: Course) => boolean;
}) => {
    const [poolAddMsg, setPoolAddMsg] = useState<string>("");

    function addPoolHandler() {
        if (addToPool(course) === true) {
            setPoolAddMsg("Course added");
        } else {
            setPoolAddMsg("Course already added");
        }
    }

    let semsOffered = "";

    if (course.semsOffered.length === 0) {
        semsOffered = "No semesters specified";
    } else {
        for (let i = 0; i < course.semsOffered.length; i++) {
            if (course.semsOffered[i] === 0) {
                semsOffered = semsOffered + "Fall";
            } else if (course.semsOffered[i] === 1) {
                semsOffered = semsOffered + "Winter";
            } else if (course.semsOffered[i] === 2) {
                semsOffered = semsOffered + "Spring";
            } else if (course.semsOffered[i] === 3) {
                semsOffered = semsOffered + "Summer";
            }
            if (i != course.semsOffered.length - 1) {
                semsOffered = semsOffered + ", ";
            }
        }
    }
    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title>{course.code + " " + course.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <b>Description:</b>
                <p>{course.descr + " " + course.restrict}</p>
                <FlexDiv>
                    <b>Semesters Offered: </b>
                    <span>{semsOffered}</span>
                </FlexDiv>
                <FlexDiv>
                    <b>Credits:</b> <span>{course.credits}</span>
                </FlexDiv>
                <FlexDiv>
                    <b>Prerequisites:</b>
                    <span>{course.preReq ? course.preReq : "None"}</span>
                </FlexDiv>
                <FlexDiv>
                    <b>Breadth: </b>
                    <span>{course.breadth ? course.breadth : "None"}</span>
                </FlexDiv>
                <FlexDiv>
                    <b>Tech: </b>
                    <Form.Check
                        type="checkbox"
                        id="tech-check"
                        name="tech-check"
                        data-testid="tech-check"
                        value="tech-check"
                        checked={course.tech}
                        onChange={handleTech}
                    />
                </FlexDiv>
            </Modal.Body>
            <Modal.Footer>
                <span>{poolAddMsg}</span>
                <Button onClick={addPoolHandler}>Add to Pool</Button>
                <Button onClick={flipEditing}>Edit</Button>
            </Modal.Footer>
        </>
    );
};
