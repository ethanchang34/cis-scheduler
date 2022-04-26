import React from "react";
import { Button } from "react-bootstrap";
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

    &:hover {
        color: var(--primary-color);
        text-decoration: underline;
    }
`;

const PageNav = styled.div`
    display: flex;
    gap: 1rem;
    align-items: center;
    margin-bottom: 1rem;
`;

export const CourseListDisplay = ({
    displayedCourses,
    error,
    modifiedCourses,
    handleShowModal,
    page,
    setPage
}: {
    displayedCourses: Course[];
    error: string;
    modifiedCourses: Record<string, Course>;
    handleShowModal: (code: string) => void;
    page: number;
    setPage: (num: number) => void;
}) => {
    const pageSize = 15;

    const paginate = (array: Course[], pageNum: number) => {
        return array.slice((pageNum - 1) * pageSize, pageNum * pageSize);
    };

    return (
        <TempCard>
            {displayedCourses.length === 0 && <h4>{error}</h4>}
            {displayedCourses.length !== 0 && (
                <PageNav>
                    <Button
                        onClick={() => {
                            setPage(page - 1);
                        }}
                        disabled={page === 1}
                    >
                        {"◀"}
                    </Button>
                    <b>
                        Page {page} of{" "}
                        {Math.ceil(displayedCourses.length / pageSize)}
                    </b>
                    <Button
                        onClick={() => {
                            setPage(page + 1);
                        }}
                        disabled={
                            page ===
                            Math.ceil(displayedCourses.length / pageSize)
                        }
                    >
                        {"▶"}
                    </Button>
                </PageNav>
            )}
            {displayedCourses.length !== 0 &&
                paginate(displayedCourses, page).map((c: Course) => {
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
