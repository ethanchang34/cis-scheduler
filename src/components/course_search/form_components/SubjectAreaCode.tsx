import React from "react";
import { Form } from "react-bootstrap";
import { SearchParam } from "../../../interfaces/SearchParam";

export const SubjectAreaCode = ({
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
            <Form.Group controlId="formSearchArea">
                <Form.Label>Subject Area:</Form.Label>
                <Form.Control
                    value={searchParam.subjectArea}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        if (e.target.value[e.target.value.length - 1] !== " ") {
                            setSearchParam({
                                ...searchParam,
                                subjectArea: e.target.value.toUpperCase()
                            });
                        }
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
        </>
    );
};
