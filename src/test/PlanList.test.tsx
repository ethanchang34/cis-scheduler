import React from "react";
import { render, screen } from "@testing-library/react";
import { PlanList } from "../components/PlanList";
import { testCourses } from "./CourseSearch.test";
import { DefaultPlans } from "../data/TestData";

const addPlan = () => {
    return;
};

const deletePlan = () => {
    return;
};

const editPlan = () => {
    return;
};

describe("Lists all the plans", () => {
    beforeEach(() => {
        render(
            <PlanList
                plans={DefaultPlans}
                addPlan={addPlan}
                deletePlan={deletePlan}
                editPlan={editPlan}
                modifiedCourses={testCourses}
            />
        );
    });

    test("Exists on the Planner page", () => {
        const linkElement = screen.getByText(/Planner/i);
        expect(linkElement).toBeInTheDocument();
    });

    test("There is 1 button, which adds a plan", () => {
        const buttons = screen.getAllByRole("button");
        expect(buttons.length).toBe(1);
        expect(screen.getByText(/Add Plan/i)).toBeInTheDocument();
    });
});
