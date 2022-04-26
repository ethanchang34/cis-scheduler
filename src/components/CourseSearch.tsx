import React, { useState } from "react";
import styled from "styled-components";
import { Course } from "../interfaces/Course";
import { SearchParam } from "../interfaces/SearchParam";
import { CourseSearchForm } from "./CourseSearchForm";
import { CourseListDisplay } from "./CourseListDisplay";
import { ViewCourseModal } from "./ViewCourseModal";

const CourseSection = styled.section`
    background-color: var(--primary-color);
    padding-top: 15vh;
    padding-bottom: 15vh;
    color: var(--secondary-color);
`;

export const CourseSearch = ({
    modifiedCourses,
    resetCourses,
    setModifiedCourses
}: {
    modifiedCourses: Record<string, Course>;
    resetCourses: () => void;
    setModifiedCourses: (newCourses: Record<string, Course>) => void;
}) => {
    const [searchParam, setSearchParam] = useState<SearchParam>({
        subjectArea: "",
        courseNum: "",
        semesters: [],
        breadth: [],
        tech: false
    });
    const [displayedCourses, setDisplayedCourses] = useState<Course[]>([]);
    const [error, setError] = useState<string>(
        "Fill out your requirements, then click search."
    );
    const [page, setPage] = useState(1);

    const [showCourseModal, setShowCourseModal] = useState(false);
    const [codeModalView, setCodeModalView] = useState<string>("CISC 437");

    const handleShowModal = (code: string) => {
        setShowCourseModal(true);
        setCodeModalView(code);
    };
    const handleCloseModal = () => setShowCourseModal(false);

    const editCourse = (newCourse: Course) => {
        const newModifiedCourses = { ...modifiedCourses };
        newModifiedCourses[newCourse.code] = newCourse;
        setModifiedCourses(newModifiedCourses);
    };

    const handleSearch = () => {
        setPage(1);
        let tempDisplayed: Course[] = Object.values(modifiedCourses);

        if (searchParam.subjectArea) {
            tempDisplayed = tempDisplayed.filter(
                (course: Course) =>
                    course.subjectArea === searchParam.subjectArea
            );
            if (tempDisplayed.length === 0) {
                setError("Department not found.");
                setDisplayedCourses(tempDisplayed);
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
                setDisplayedCourses(tempDisplayed);
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
                setDisplayedCourses(tempDisplayed);
                return;
            }
        }

        if (searchParam.breadth.length !== 0) {
            tempDisplayed = tempDisplayed.filter((course: Course) =>
                searchParam.breadth.includes(course.breadth)
            );
            if (tempDisplayed.length === 0) {
                setError("No courses match selected breadth requirements.");
                setDisplayedCourses(tempDisplayed);
                return;
            }
        }

        if (searchParam.tech) {
            tempDisplayed = tempDisplayed.filter(
                (course: Course) => course.tech
            );
            if (tempDisplayed.length === 0) {
                setError("No technical electives found.");
                setDisplayedCourses(tempDisplayed);
                return;
            }
        }
        setDisplayedCourses(tempDisplayed);
    };

    return (
        <CourseSection>
            <CourseSearchForm
                searchParam={searchParam}
                setSearchParam={setSearchParam}
                resetCourses={resetCourses}
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
            <ViewCourseModal
                show={showCourseModal}
                handleClose={handleCloseModal}
                code={codeModalView}
                editCourse={editCourse}
                modifiedCourses={modifiedCourses}
            ></ViewCourseModal>
        </CourseSection>
    );
};
