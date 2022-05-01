import React from "react";
import { render, screen } from "@testing-library/react";
import { YearList } from "../components/YearList";
import { originalCourses } from "../App";
import { DefaultPlans } from "../data/TestData";

const deleteYear = () => {
    return;
};

const editYear = () => {
    return;
};

describe("User can see a list of years and be able delete a year", () => {
    beforeEach(() => {
        localStorage.clear();
        render(
            <YearList
                years={DefaultPlans[0].years}
                deleteYear={deleteYear}
                editYear={editYear}
                modifiedCourses={originalCourses}
            />
        );
    });

    test("Exists on the Planner Page", () => {
        const linkElement = screen.getByText(/Plans/i);
        expect(linkElement).toBeInTheDocument();
    });

    test("You can see all 4 years", () => {
        const years = screen.getAllByText(/year/i);
        expect(years.length).toBe(4);
    });

    test("There is a button that allows the user to delete a year", () => {
        const oldYears = screen.getAllByAltText(/year/i);
        const deleteYear = screen.getByRole("button", {
            name: /delete year/i
        });
        expect(deleteYear).toBeInTheDocument();
        deleteYear.click();
        const newYears = screen.getAllByText(/year/i);
        expect(newYears.length).toBe(oldYears.length - 1);
    });
});
