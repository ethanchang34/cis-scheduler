import React from "react";
import { Form } from "react-bootstrap";
import { SearchParam } from "../../../interfaces/SearchParam";

export const SemesterCheck = ({
    searchParam,
    setSearchParam
}: {
    searchParam: SearchParam;
    setSearchParam: (newSearch: SearchParam) => void;
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

    return (
        <>
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
        </>
    );
};
