import React from "react";
import { render, screen } from "@testing-library/react";
// import { PlanView } from "../components/PlanView";
// import { originalCourses } from "../App";
// import { DefaultPlans } from "../data/TestData";
import App from "../App";

// const deletePlan = () => {
//     return;
// };

// const editPlan = () => {
//     return;
// };

describe("User should be able to add a year", () => {
    beforeEach(() => {
        localStorage.clear();
        render(
            // <PlanView
            //     plan={DefaultPlans[0]}
            //     deletePlan={deletePlan}
            //     editPlan={editPlan}
            //     modifiedCourses={originalCourses}
            //     selected={true}
            // />
            <App></App>
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

describe("User should be able to clear all existing semesters in a plan", () => {
    beforeEach(() => {
        localStorage.clear();
        render(
            // <PlanView
            //     plan={DefaultPlans[0]}
            //     deletePlan={deletePlan}
            //     editPlan={editPlan}
            //     modifiedCourses={originalCourses}
            //     selected={true}
            // />
            <App></App>
        );
    });

    test("You can clear all semesters in a plan", () => {
        const clearSems = screen.getByRole("button", {
            name: /clear all semesters/i
        });
        expect(clearSems).toBeInTheDocument();
        clearSems.click();
        const newSems = screen.getAllByText(
            /fall/i || /winter/i || /spring/i || /summer/i
        );
        newSems.forEach((x) => {
            expect(x).not.toBeInTheDocument();
        });
    });
});
