import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import styled from "styled-components";
import { Course } from "../interfaces/Course";

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
    handleShowModal
}: {
    modifiedCourses: Record<string, Course>;
    handleShowModal: (code: string) => void;
}) => {
    const [subjectArea, setSubjectArea] = useState<string>("");
    const [courseNum, setCourseNum] = useState<string>("");
    const [semesters, setSemesters] = useState<string[]>([]);
    const [breadth, setBreadth] = useState<string[]>([]);
    const [tech, setTech] = useState<boolean>(false);
    const [displayedCourses, setDisplayedCourses] = useState<Course[]>([]);
    const [error, setError] = useState<string>(
        "Fill out your requirements, then click search."
    );

    const updateSemester = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newSems = e.target.value;

        if (semesters.includes(newSems)) {
            setSemesters(semesters.filter((e) => e !== newSems));
        } else {
            setSemesters([...semesters, newSems]);
        }
    };

    const updateBreadth = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newBreadth = e.target.value;

        if (breadth.includes(newBreadth)) {
            setBreadth(breadth.filter((e) => e !== newBreadth));
        } else {
            setBreadth([...breadth, newBreadth]);
        }
    };

    const handleSearch = () => {
        let tempDisplayed: Course[] = Object.values(modifiedCourses);

        if (subjectArea) {
            tempDisplayed = tempDisplayed.filter(
                (course: Course) => course.subjectArea === subjectArea
            );
            if (tempDisplayed.length === 0) {
                setError("Department not found.");
                setDisplayedCourses(tempDisplayed);
                return;
            }
        }

        if (courseNum) {
            tempDisplayed = tempDisplayed.filter((course: Course) => {
                const inputSize = courseNum.length;
                if (inputSize === 3) {
                    return course.number === courseNum;
                } else if (inputSize < 4) {
                    return (
                        course.number.substring(0, inputSize) ===
                        courseNum.substring(0, inputSize)
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

        if (semesters.length !== 0 && semesters.length !== 4) {
            tempDisplayed = tempDisplayed.filter((course: Course) => {
                if (
                    course.semsOffered.includes(0) && // [0,1,2,3]
                    semesters.includes("Fall")
                )
                    return true;
                else if (
                    course.semsOffered.includes(1) &&
                    semesters.includes("Winter")
                )
                    return true;
                else if (
                    course.semsOffered.includes(2) &&
                    semesters.includes("Spring")
                )
                    return true;
                else if (
                    course.semsOffered.includes(3) &&
                    semesters.includes("Summer")
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

        if (breadth.length !== 0) {
            tempDisplayed = tempDisplayed.filter((course: Course) =>
                breadth.includes(course.breadth)
            );
            if (tempDisplayed.length === 0) {
                setError("No courses match selected breadth requirements.");
                setDisplayedCourses(tempDisplayed);
                return;
            }
        }

        if (tech) {
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
            <h1>Search Courses:</h1>
            <Form.Group controlId="formSearchArea">
                <Form.Label>Subject Area:</Form.Label>
                <Form.Control
                    value={subjectArea}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setSubjectArea(e.target.value.toUpperCase())
                    }
                />
            </Form.Group>
            <Form.Group controlId="formSearchNum">
                <Form.Label>Course Number:</Form.Label>
                <Form.Control
                    type="number"
                    value={courseNum}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setCourseNum(e.target.value)
                    }
                />
            </Form.Group>
            <Form.Label>Semesters Offered: </Form.Label>
            <div>
                <Form.Check
                    inline
                    type="checkbox"
                    name="sems"
                    onChange={updateSemester}
                    id="sems-fall"
                    label="Fall"
                    value="Fall"
                    checked={semesters.includes("Fall")}
                />
                <Form.Check
                    inline
                    type="checkbox"
                    name="sems"
                    onChange={updateSemester}
                    id="sems-winter"
                    label="Winter"
                    value="Winter"
                    checked={semesters.includes("Winter")}
                />
                <Form.Check
                    inline
                    type="checkbox"
                    name="sems"
                    onChange={updateSemester}
                    id="sems-spring"
                    label="Spring"
                    value="Spring"
                    checked={semesters.includes("Spring")}
                />
                <Form.Check
                    inline
                    type="checkbox"
                    name="sems"
                    onChange={updateSemester}
                    id="sems-summer"
                    label="Summer"
                    value="Summer"
                    checked={semesters.includes("Summer")}
                />
            </div>
            <Form.Label>Filter Breadths: </Form.Label>
            <div style={{ marginBottom: ".5rem" }}>
                <Form.Check
                    type="checkbox"
                    id="breadth-check-creative"
                    label="Creative Arts and Humanities"
                    name="emotions"
                    value="Creative Arts and Humanities"
                    checked={breadth.includes("Creative Arts and Humanities")}
                    onChange={updateBreadth}
                />
                <Form.Check
                    type="checkbox"
                    id="breadth-check-history"
                    label="History and Cultural Change"
                    name="emotions"
                    value="History and Cultural Change"
                    checked={breadth.includes("History and Cultural Change")}
                    onChange={updateBreadth}
                />
                <Form.Check
                    type="checkbox"
                    id="breadth-check-social"
                    label="Social and Behavioral Sciences"
                    name="emotions"
                    value="Social and Behavioral Sciences"
                    checked={breadth.includes("Social and Behavioral Sciences")}
                    onChange={updateBreadth}
                />
                <Form.Check
                    type="checkbox"
                    id="breadth-check-math"
                    label="Mathematics, Natural Sciences and Technology"
                    name="emotions"
                    value="Mathematics, Natural Sciences and Technology"
                    checked={breadth.includes(
                        "Mathematics, Natural Sciences and Technology"
                    )}
                    onChange={updateBreadth}
                />
            </div>
            <Form.Group
                controlId="tech-search-form"
                style={{ display: "flex", alignItems: "center" }}
            >
                <Form.Label
                    style={{
                        marginBottom: ".2rem",
                        marginRight: ".5rem",
                        cursor: "pointer"
                    }}
                    onClick={() => {
                        setTech(!tech);
                    }}
                >
                    Technical Elective:
                </Form.Label>
                <Form.Check
                    type="checkbox"
                    id="tech-search-check"
                    name="tech-search-check"
                    data-testid="tech-search-check"
                    value="tech-search-check"
                    checked={tech}
                    onChange={() => {
                        setTech(!tech);
                    }}
                />
            </Form.Group>
            <Button
                onClick={handleSearch}
                className="btn-outline-primary btn-light"
                style={{
                    margin: "0 auto 1rem auto",
                    display: "block"
                }}
            >
                Search
            </Button>
            <TempCard>
                {displayedCourses.length === 0 && <h4>{error}</h4>}
                {displayedCourses.map((course: Course) => (
                    <CourseLink
                        key={course.code}
                        onClick={() => {
                            handleShowModal(course.code);
                        }}
                    >
                        {course.code} {course.name}
                    </CourseLink>
                ))}
            </TempCard>
        </CourseSection>
    );
};
