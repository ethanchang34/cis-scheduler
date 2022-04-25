import React, { useState } from "react";
import styled from "styled-components";
import { Course } from "../interfaces/Course";
import { SearchParam } from "../interfaces/SearchParam";
import { CourseSearchForm } from "./CourseSearchForm";

const CourseSection = styled.section`
    background-color: var(--primary-color);
    padding-top: 15vh;
    padding-bottom: 15vh;
    color: var(--secondary-color);
`;

const TempCard = styled.section`
    background-color: var(--secondary-color);
    padding: 1rem;
    border-radius: 30px;
    color: black;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const CourseLink = styled.span`
    margin-bottom: 1rem;
    cursor: pointer;

    &:last-of-type {
        margin-bottom: 0;
    }

    &:hover {
        color: var(--primary-color);
        text-decoration: underline;
    }
`;

export const CourseSearch = ({
    modifiedCourses,
    handleShowModal,
    resetCourses
}: {
    modifiedCourses: Record<string, Course>;
    handleShowModal: (code: string) => void;
    resetCourses: () => void;
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

    const handleSearch = () => {
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
            <TempCard>
                {displayedCourses.length === 0 && <h4>{error}</h4>}
                {displayedCourses.map((c: Course) => {
                    const course = modifiedCourses[c.code];
                    return (
                        <CourseLink
                            key={course.code}
                            onClick={() => {
                                handleShowModal(course.code);
                            }}
                        >
                            {course.code} {course.name}
                        </CourseLink>
                    );
                })}
            </TempCard>
        </CourseSection>
    );
};
