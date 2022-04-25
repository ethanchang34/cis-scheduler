import React, { useState } from "react";
import styled from "styled-components";
import { Course } from "../interfaces/Course";

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

export const CourseListDisplay = ({
    displayedCourses,
    error,
    modifiedCourses,
    handleShowModal
}: {
    displayedCourses: Course[];
    error: string;
    modifiedCourses: Record<string, Course>;
    handleShowModal: (code: string) => void;
}) => {
    return (
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
    );
};
