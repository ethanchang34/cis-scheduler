import React from "react";
import { Button } from "react-bootstrap";
import { SearchParam } from "../../../interfaces/SearchParam";
import { BreadthCheck } from "./BreadthCheck";
import { SemesterCheck } from "./SemesterCheck";
import { SubjectAreaCode } from "./SubjectAreaCode";
import { TechMulticultural } from "./TechMulticultural";

export const CourseSearchForm = ({
    searchParam,
    setSearchParam,
    handleSearch
}: {
    searchParam: SearchParam;
    setSearchParam: (newSearch: SearchParam) => void;
    handleSearch: () => void;
}) => {
    return (
        <>
            <h1>Search Courses:</h1>
            <SubjectAreaCode
                searchParam={searchParam}
                setSearchParam={setSearchParam}
                handleSearch={handleSearch}
            ></SubjectAreaCode>
            <SemesterCheck
                searchParam={searchParam}
                setSearchParam={setSearchParam}
            ></SemesterCheck>
            <BreadthCheck
                searchParam={searchParam}
                setSearchParam={setSearchParam}
            ></BreadthCheck>
            <TechMulticultural
                searchParam={searchParam}
                setSearchParam={setSearchParam}
            ></TechMulticultural>
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
