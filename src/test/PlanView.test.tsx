import React from "react";
import { render, screen } from "@testing-library/react";
import { PlanView } from "../components/PlanView";
import { testCourses } from "./CourseSearch.test";
import { DefaultPlans } from "../data/TestData";

const deletePlan = () => {
    return;
};

const editPlan = () => {
    return;
};

describe("User should be able to add a year", () => {
    beforeEach(() => {
        render(
            <PlanView
                plan={DefaultPlans[0]}
                deletePlan={deletePlan}
                editPlan={editPlan}
                modifiedCourses={testCourses}
                selected={true}
            />
        );
    });

    test("There is a button that allows the user to add a year", () => {
        const oldYears = screen.getAllByAltText(/year/i);
        const addYear = screen.getByRole("button", {
            name: /add year/i
        });
        expect(addYear).toBeInTheDocument();
        addYear.click();
        const newYears = screen.getAllByText(/year/i);
        expect(newYears.length).toBe(oldYears.length + 1);
    });
});
