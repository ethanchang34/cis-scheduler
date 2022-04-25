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

describe("User can see a list of plans and be able to edit and delete them", () => {
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
        const linkElement = screen.getByText(/Plans/i);
        expect(linkElement).toBeInTheDocument();
    });

    test("There is a button, which adds a plan", () => {
        const buttons = screen.getAllByRole("button");
        const oldTitles = screen.getAllByAltText("Title");
        let seenButton = false;
        buttons.forEach((x) => {
            if (x.textContent === "Add Plan") {
                seenButton = true;
                const addPlan = x;
                addPlan.click();
                const newPlan = screen.getByText(/New Plan/i);
                expect(newPlan).toBeInTheDocument();
            }
        });
        const newTitles = screen.getAllByAltText("Title");
        expect(newTitles.length).toBe(oldTitles.length + 1);
        expect(seenButton).toBe(true);
    });

    test("There is a button, which allows the user to edit or delete a plan", () => {
        const button = screen.getByRole("button", { name: /edit/i });
        expect(button).toBeInTheDocument();
        button.click();
        const save = screen.getByRole("button", { name: /save/i });
        const cancel = screen.getByRole("button", { name: /cancel/i });
        const deletePlan = screen.getByRole("button", { name: /delete/i });
        expect(save).toBeInTheDocument();
        expect(cancel).toBeInTheDocument();
        expect(deletePlan).toBeInTheDocument();
    });

    test("You can see the title of a plan", () => {
        const titleElement = screen.getByText(/Title/i); //or Title: Default Plan?
        expect(titleElement).toBeInTheDocument();
    });

    test("You can seee the plan description", () => {
        const descElement = screen.getByText(/Title/i);
        expect(descElement).toBeInTheDocument();
    });
});
