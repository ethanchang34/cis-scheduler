import React /*{ useState }*/ from "react";
import { Modal, Form } from "react-bootstrap";
import styled from "styled-components";
import { Course } from "../interfaces/Course";

const FlexDiv = styled.div`
    display: flex;
    gap: 0.5rem;
    margin-bottom: 0.25rem;
`;

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
                    <h1>Modal Footer</h1>
                </Modal.Footer>
            </Modal>
        </div>
    );
};
