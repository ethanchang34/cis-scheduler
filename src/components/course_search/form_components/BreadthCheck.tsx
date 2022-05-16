import React from "react";
import { Form } from "react-bootstrap";
import { SearchParam } from "../../../interfaces/SearchParam";

export const BreadthCheck = ({
    searchParam,
    setSearchParam
}: {
    searchParam: SearchParam;
    setSearchParam: (newSearch: SearchParam) => void;
}) => {
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
            {" "}
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
        </>
    );
};
