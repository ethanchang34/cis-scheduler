import React from "react";
import { Form } from "react-bootstrap";
import { SearchParam } from "../../../interfaces/SearchParam";

export const TechMulticultural = ({
    searchParam,
    setSearchParam
}: {
    searchParam: SearchParam;
    setSearchParam: (newSearch: SearchParam) => void;
}) => {
    return (
        <>
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
            <Form.Group
                controlId="multi-search-form"
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
                            multicultural: !searchParam.multicultural
                        });
                    }}
                >
                    Multicultural Breadth:
                </Form.Label>
                <Form.Check
                    type="checkbox"
                    id="multi-search-check"
                    name="multi-search-check"
                    data-testid="multi-search-check"
                    value="multi-search-check"
                    checked={searchParam.multicultural}
                    onChange={() => {
                        setSearchParam({
                            ...searchParam,
                            multicultural: !searchParam.multicultural
                        });
                    }}
                />
            </Form.Group>
        </>
    );
};
