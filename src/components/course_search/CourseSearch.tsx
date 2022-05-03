import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Course } from "../../interfaces/Course";
import { SearchParam } from "../../interfaces/SearchParam";
import { CourseSearchForm } from "./CourseSearchForm";
import { CourseListDisplay } from "./CourseListDisplay";
import { ViewCourseModal } from "../course_modal/ViewCourseModal";
import { SectionContent } from "../../App";
import { Button, Form } from "react-bootstrap";
import { downloadCourses, uploadCourse } from "../../data/ParseDataFunctions";

const CourseSection = styled.section`
    background-color: var(--primary-color);
    padding-top: 15vh;
    padding-bottom: 15vh;
    color: var(--secondary-color);
`;

export const CourseSearch = ({
    modifiedCourses,
    resetCourses,
    setModifiedCourses,
    addToPool
}: {
    modifiedCourses: Record<string, Course>;
    resetCourses: () => void;
    setModifiedCourses: (newCourses: Record<string, Course>) => void;
    addToPool: (course: Course) => boolean;
}) => {
    const [searchParam, setSearchParam] = useState<SearchParam>(() => {
        const saved = localStorage.getItem("CISC275-4-searchParam");
        if (saved) {
            return JSON.parse(saved);
        } else {
            return {
                subjectArea: "",
                courseNum: "",
                semesters: [],
                breadth: [],
                tech: false
            };
        }
    });
    const [displayedCourses, setDisplayedCourses] = useState<string[]>(() => {
        const saved = localStorage.getItem("CISC275-4-displayedCourses");
        if (saved) {
            return JSON.parse(saved);
        } else {
            return [];
        }
    });
    const [error, setError] = useState<string>(
        "Fill out your requirements, then click search."
    );
    const [page, setPage] = useState(() => {
        const saved = localStorage.getItem("CISC275-4-page");
        if (saved) {
            return JSON.parse(saved);
        } else {
            return 1;
        }
    });

    const [showCourseModal, setShowCourseModal] = useState(false);
    const [codeModalView, setCodeModalView] = useState<string>("CISC 437");

    useEffect(() => {
        localStorage.setItem(
            "CISC275-4-searchParam",
            JSON.stringify(searchParam)
        );
    }, [searchParam]);

    useEffect(() => {
        localStorage.setItem(
            "CISC275-4-displayedCourses",
            JSON.stringify(displayedCourses)
        );
    }, [displayedCourses]);

    useEffect(() => {
        localStorage.setItem("CISC275-4-page", JSON.stringify(page));
    }, [page]);

    const handleShowModal = (code: string) => {
        setShowCourseModal(true);
        setCodeModalView(code);
    };
    const handleCloseModal = () => setShowCourseModal(false);

    const editCourse = (newCourse: Course) => {
        const newModifiedCourses = { ...modifiedCourses };
        const saved = localStorage.getItem("CISC275-4-modifiedCourses");
        if (saved) {
            const localModified: Record<string, Course> = JSON.parse(saved);
            localModified[newCourse.code] = newCourse;
            localStorage.setItem(
                "CISC275-4-modifiedCourses",
                JSON.stringify(localModified)
            );
        } else {
            const newLocalModified: Record<string, Course> = {};
            newLocalModified[newCourse.code] = newCourse;
            localStorage.setItem(
                "CISC275-4-modifiedCourses",
                JSON.stringify(newLocalModified)
            );
        }
        newModifiedCourses[newCourse.code] = newCourse;
        setModifiedCourses(newModifiedCourses);
    };

    const handleSearch = () => {
        setPage(1);
        setError("No courses found.");
        let tempDisplayed: Course[] = Object.values(modifiedCourses);

        if (searchParam.subjectArea) {
            tempDisplayed = tempDisplayed.filter(
                (course: Course) =>
                    course.subjectArea === searchParam.subjectArea
            );
            if (tempDisplayed.length === 0) {
                setError("Department not found.");
                setDisplayedCourses([]);
                return;
            }
        }

        if (searchParam.courseNum) {
            tempDisplayed = tempDisplayed.filter((course: Course) => {
                const inputSize = searchParam.courseNum.length;
                if (inputSize === 3) {
                    return course.number === searchParam.courseNum;
                } else if (inputSize < 4) {
                    return (
                        course.number.substring(0, inputSize) ===
                        searchParam.courseNum.substring(0, inputSize)
                    );
                } else {
                    return false;
                }
            });
            if (tempDisplayed.length === 0) {
                setError("No matching class numbers with department.");
                setDisplayedCourses([]);
                return;
            }
        }

        if (
            searchParam.semesters.length !== 0 &&
            searchParam.semesters.length !== 4
        ) {
            tempDisplayed = tempDisplayed.filter((course: Course) => {
                if (
                    course.semsOffered.includes(0) && // [0,1,2,3]
                    searchParam.semesters.includes("Fall")
                )
                    return true;
                else if (
                    course.semsOffered.includes(1) &&
                    searchParam.semesters.includes("Winter")
                )
                    return true;
                else if (
                    course.semsOffered.includes(2) &&
                    searchParam.semesters.includes("Spring")
                )
                    return true;
                else if (
                    course.semsOffered.includes(3) &&
                    searchParam.semesters.includes("Summer")
                )
                    return true;
                else return false;
            });
            if (tempDisplayed.length === 0) {
                setError("No classes exist during selected semesters.");
                setDisplayedCourses([]);
                return;
            }
        }

        if (searchParam.breadth.length !== 0) {
            tempDisplayed = tempDisplayed.filter((course: Course) =>
                searchParam.breadth.includes(course.breadth)
            );
            if (tempDisplayed.length === 0) {
                setError("No courses match selected breadth requirements.");
                setDisplayedCourses([]);
                return;
            }
        }

        if (searchParam.tech) {
            tempDisplayed = tempDisplayed.filter(
                (course: Course) => course.tech
            );
            if (tempDisplayed.length === 0) {
                setError("No technical electives found.");
                setDisplayedCourses([]);
                return;
            }
        }

        const stringDisplayed: string[] = tempDisplayed.map(
            (c: Course): string => {
                return c.code;
            }
        );
        setDisplayedCourses(stringDisplayed);
    };

    return (
        <CourseSection>
            <SectionContent>
                <CourseSearchForm
                    searchParam={searchParam}
                    setSearchParam={setSearchParam}
                    handleSearch={handleSearch}
                ></CourseSearchForm>
                <CourseListDisplay
                    displayedCourses={displayedCourses}
                    error={error}
                    modifiedCourses={modifiedCourses}
                    handleShowModal={handleShowModal}
                    page={page}
                    setPage={setPage}
                ></CourseListDisplay>
                <Button
                    onClick={() => {
                        downloadCourses();
                    }}
                >
                    Download Courses
                </Button>
                <Button
                    className="btn-danger"
                    onClick={() => {
                        resetCourses();
                    }}
                >
                    Reset Course Changes
                </Button>
                <Form.Group controlId="exampleForm">
                    <Form.Label>Upload a course file</Form.Label>
                    <Form.Control
                        type="file"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            uploadCourse(
                                modifiedCourses,
                                setModifiedCourses,
                                e
                            );
                        }}
                    />
                </Form.Group>
            </SectionContent>
            <ViewCourseModal
                show={showCourseModal}
                handleClose={handleCloseModal}
                code={codeModalView}
                editCourse={editCourse}
                modifiedCourses={modifiedCourses}
                addToPool={addToPool}
            ></ViewCourseModal>
        </CourseSection>
    );
};
