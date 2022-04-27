import React from "react";
import { render, screen } from "@testing-library/react";
import { YearView } from "../components/YearView";
import { originalCourses } from "../App";
import { DefaultPlans } from "../data/TestData";

const deleteYear = () => {
    return;
};

const editYear = () => {
    return;
};

describe("User should be able to add a semester to a year", () => {
    beforeEach(() => {
        localStorage.clear();
        render(
            <YearView
                year={DefaultPlans[0].years[0]}
                deleteYear={deleteYear}
                editYear={editYear}
                modifiedCourses={originalCourses}
            />
        );
    });

    //this test might require more work since we use a dropdown menu to add semesters
    test("You can add a semester", () => {
        const addSem = screen.getByText(/add semester/i);
        expect(addSem).toBeInTheDocument();
    });
});
