import React, { useState } from "react";
import { render, screen } from "@testing-library/react";
import { PlanList } from "../components/PlanList";
import { originalCourses } from "../App";
import App from "../App";
import { Course } from "../interfaces/Course";
import { DefaultRequirement } from "../data/TestData";

const coursePool: string[] = [];
const addToPool = (course: Course) => {
    return false;
};
const removeFromPool = (course: Course) => {
    return;
};
describe("User can see a list of plans and be able to edit and delete them", () => {
    beforeEach(() => {
        localStorage.clear();
        render(
            <PlanList
                modifiedCourses={originalCourses}
                coursePool={coursePool}
                addToPool={addToPool}
                removeFromPool={removeFromPool}
                reqs={DefaultRequirement}
            ></PlanList>
        );
    });

    test("There is a button, which adds a plan", () => {
        const addPlan = screen.getByRole("button", { name: /add plan/i });
        expect(addPlan).toBeInTheDocument();
        addPlan.click();
        expect(screen.getByText(/New Plan/i)).toBeInTheDocument();
    });

    //add userInputEvent to this test
    test("There is a button, which allows the user to edit or delete a plan", () => {
        const edit = screen.getByRole("button", { name: /edit/i });
        expect(edit).toBeInTheDocument();
        edit.click();
        const save = screen.getByRole("button", { name: /save/i });
        const cancel = screen.getByRole("button", { name: /cancel/i });
        const deletePlan = screen.getByRole("button", { name: /delete/i });
        expect(save).toBeInTheDocument();
        expect(cancel).toBeInTheDocument();
        expect(deletePlan).toBeInTheDocument();
    });

    test("You can see the title of a plan", () => {
        const titleElement = screen.getByRole("heading", {
            name: /Default plan/i
        }); //or Title: Default Plan?
        expect(titleElement).toBeInTheDocument();
    });

    test("You can seee the plan description", () => {
        const descElement = screen.getByText(/Description/i);
        expect(descElement).toBeInTheDocument();
    });
});
