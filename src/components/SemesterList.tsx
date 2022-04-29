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
                {semesters.map((semester: Semester, idx: number) =>
                    semester.id < 2 && semester.active === true ? (
                        <Col
                            key={idx}
                            className="border m-2 p-3 text-white"
                            style={{
                                backgroundColor: "var(--primary-color)",
                                borderRadius: 15
                            }}
                        >
                            <SemesterView
                                semester={semester}
                                idx={idx}
                                deleteSemester={deleteSemester}
                                editSemester={editSemester}
                                modifiedCourses={modifiedCourses}
                            ></SemesterView>
                        </Col>
                    ) : idx < 2 ? (
                        <Col
                            key={idx}
                            className="m-2 p-2"
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                            }}
                        >
                            <Button onClick={() => addSemester(semester.id)}>
                                + Add Semester
                            </Button>
                        </Col>
                    ) : (
                        <></>
                    )
                )}
            </Row>
            <Row>
                {semesters.map((semester: Semester, idx: number) =>
                    semester.id > 1 && semester.active === true ? (
                        <Col
                            key={idx}
                            className="border m-2 p-3 text-white"
                            style={{
                                backgroundColor: "var(--primary-color)",
                                borderRadius: 15
                            }}
                        >
                            <SemesterView
                                semester={semester}
                                deleteSemester={deleteSemester}
                                editSemester={editSemester}
                                modifiedCourses={modifiedCourses}
                                idx={idx}
                            ></SemesterView>
                        </Col>
                    ) : idx > 1 ? (
                        <Col
                            key={idx}
                            className="m-2 p-2"
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                            }}
                        >
                            <Button onClick={() => addSemester(semester.id)}>
                                + Add Semester
                            </Button>
                        </Col>
                    ) : (
                        <></>
                    )
                )}
            </Row>
        </div>
    );
};
