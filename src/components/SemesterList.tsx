import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Semester } from "../interfaces/Semester";
import { Course } from "../interfaces/Course";
import { SemesterView } from "./SemesterView";

export const SemesterList = ({
    semesters,
    addSemester,
    deleteSemester,
    editSemester,
    modifiedCourses
}: {
    semesters: Semester[];
    addSemester: (id: number) => void;
    deleteSemester: (id: number) => void;
    editSemester: (id: number, newSemester: Semester) => void;
    modifiedCourses: Record<string, Course>;
}) => {
    return (
        <div>
            <Row>
                {semesters.map((semester: Semester) =>
                    semester.active === true ? (
                        <Col
                            key={semester.id}
                            className="bg-light border m-2 p-2"
                        >
                            <SemesterView
                                semester={semester}
                                deleteSemester={deleteSemester}
                                editSemester={editSemester}
                                modifiedCourses={modifiedCourses}
                            ></SemesterView>
                        </Col>
                    ) : (
                        <Col
                            key={semester.id}
                            className="bg-light border m-2 p-2"
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                            }}
                        >
                            <Button
                                className={"btn-success"}
                                onClick={() => addSemester(semester.id)}
                            >
                                + Add Semester
                            </Button>
                        </Col>
                    )
                )}
            </Row>
        </div>
    );
};
