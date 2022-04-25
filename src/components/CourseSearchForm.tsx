import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { SearchParam } from "../interfaces/SearchParam";

export const CourseSearchForm = ({
    searchParam,
    setSearchParam,
    resetCourses,
    handleSearch
}: {
    searchParam: SearchParam;
    setSearchParam: (newSearch: SearchParam) => void;
    resetCourses: () => void;
    handleSearch: () => void;
}) => {
    const updateSemester = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newSems = e.target.value;

        if (searchParam.semesters.includes(newSems)) {
            setSearchParam({
                ...searchParam,
                semesters: searchParam.semesters.filter((e) => e !== newSems)
            });
        } else {
            setSearchParam({
                ...searchParam,
                semesters: [...searchParam.semesters, newSems]
            });
        }
    };

    const updateBreadth = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newBreadth = e.target.value;

        if (searchParam.breadth.includes(newBreadth)) {
            setSearchParam({
                ...searchParam,
                breadth: searchParam.breadth.filter((e) => e !== newBreadth)
            });
        } else {
            setSearchParam({
                ...searchParam,
                breadth: [...searchParam.breadth, newBreadth]
            });
        }
    };
    return (
        <>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h1>Search Courses:</h1>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <Button
                        className="btn-danger"
                        onClick={() => {
                            resetCourses();
                        }}
                    >
                        Reset Course Changes
                    </Button>
                </div>
            </div>
            <Form.Group controlId="formSearchArea">
                <Form.Label>Subject Area:</Form.Label>
                <Form.Control
                    value={searchParam.subjectArea}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setSearchParam({
                            ...searchParam,
                            subjectArea: e.target.value.toUpperCase()
                        });
                    }}
                    onKeyPress={(e) => {
                        if (e.key === "Enter") {
                            handleSearch();
                        }
                    }}
                />
            </Form.Group>
            <Form.Group controlId="formSearchNum">
                <Form.Label>Course Number:</Form.Label>
                <Form.Control
                    type="number"
                    value={searchParam.courseNum}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setSearchParam({
                            ...searchParam,
                            courseNum: e.target.value
                        })
                    }
                    onKeyPress={(e) => {
                        if (e.key === "Enter") {
                            handleSearch();
                        }
                    }}
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
                    checked={searchParam.semesters.includes("Fall")}
                />
                <Form.Check
                    inline
                    type="checkbox"
                    name="sems"
                    onChange={updateSemester}
                    id="sems-winter"
                    label="Winter"
                    value="Winter"
                    checked={searchParam.semesters.includes("Winter")}
                />
                <Form.Check
                    inline
                    type="checkbox"
                    name="sems"
                    onChange={updateSemester}
                    id="sems-spring"
                    label="Spring"
                    value="Spring"
                    checked={searchParam.semesters.includes("Spring")}
                />
                <Form.Check
                    inline
                    type="checkbox"
                    name="sems"
                    onChange={updateSemester}
                    id="sems-summer"
                    label="Summer"
                    value="Summer"
                    checked={searchParam.semesters.includes("Summer")}
                />
            </div>
            <Form.Label>Filter Breadths: </Form.Label>
            <div style={{ marginBottom: ".5rem" }}>
                <Form.Check
                    type="checkbox"
                    id="breadth-check-creative"
                    label="Creative Arts and Humanities"
                    name="breadth-check-filter"
                    value="Creative Arts and Humanities"
                    checked={searchParam.breadth.includes(
                        "Creative Arts and Humanities"
                    )}
                    onChange={updateBreadth}
                />
                <Form.Check
                    type="checkbox"
                    id="breadth-check-history"
                    label="History and Cultural Change"
                    name="breadth-check-filter"
                    value="History and Cultural Change"
                    checked={searchParam.breadth.includes(
                        "History and Cultural Change"
                    )}
                    onChange={updateBreadth}
                />
                <Form.Check
                    type="checkbox"
                    id="breadth-check-social"
                    label="Social and Behavioral Sciences"
                    name="breadth-check-filter"
                    value="Social and Behavioral Sciences"
                    checked={searchParam.breadth.includes(
                        "Social and Behavioral Sciences"
                    )}
                    onChange={updateBreadth}
                />
                <Form.Check
                    type="checkbox"
                    id="breadth-check-math"
                    label="Mathematics, Natural Sciences and Technology"
                    name="breadth-check-filter"
                    value="Mathematics, Natural Sciences and Technology"
                    checked={searchParam.breadth.includes(
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
                        setSearchParam({
                            ...searchParam,
                            tech: !searchParam.tech
                        });
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
                    checked={searchParam.tech}
                    onChange={() => {
                        setSearchParam({
                            ...searchParam,
                            tech: !searchParam.tech
                        });
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
        </>
    );
};
