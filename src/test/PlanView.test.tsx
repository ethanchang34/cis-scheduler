import React from "react";
import { render, screen } from "@testing-library/react";
import { PlanView } from "../components/planner/PlanView";
import { originalCourses } from "../App";
import { DefaultPlans } from "../data/TestData";
import { Course } from "../interfaces/Course";
import { DefaultRequirement } from "../data/TestData";

const deletePlan = () => {
    return;
};

const editPlan = () => {
    return;
};

const coursePool: string[] = [];
const addToPool = (course: Course) => {
    console.log(course);
    return false;
};
const removeFromPool = (course: Course) => {
    console.log(course);
    return;
};

describe("User should be able to add a year", () => {
    beforeEach(() => {
        localStorage.clear();
        render(
            <PlanView
                plan={DefaultPlans[0]}
                deletePlan={deletePlan}
                editPlan={editPlan}
                modifiedCourses={originalCourses}
                selected={true}
                coursePool={coursePool}
                addToPool={addToPool}
                removeFromPool={removeFromPool}
                reqs={DefaultRequirement}
            />
        );
    });

    test("There is a button that allows the user to add a year", () => {
        const addYear = screen.getByRole("button", {
            name: /add year/i
        });
        expect(addYear).toBeInTheDocument();
    });
});

describe("User should be able to clear all existing semesters in a plan", () => {
    beforeEach(() => {
        localStorage.clear();
        render(
            <PlanView
                plan={DefaultPlans[0]}
                deletePlan={deletePlan}
                editPlan={editPlan}
                modifiedCourses={originalCourses}
                selected={true}
                coursePool={coursePool}
                addToPool={addToPool}
                removeFromPool={removeFromPool}
                reqs={DefaultRequirement}
            />
        );
    });

    test("There's a button to clear all semesters in a plan", () => {
        const clearSems = screen.getByRole("button", {
            name: /clear all semesters/i
        });
        expect(clearSems).toBeInTheDocument();
    });
});

describe("User should be able to edit a plan", () => {
    beforeEach(() => {
        localStorage.clear();
        render(
            <PlanView
                plan={DefaultPlans[0]}
                deletePlan={deletePlan}
                editPlan={editPlan}
                modifiedCourses={originalCourses}
                selected={false}
                coursePool={coursePool}
                addToPool={addToPool}
                removeFromPool={removeFromPool}
                reqs={DefaultRequirement}
            />
        );
    });

    test("There's a button to edit a plan", () => {
        const editPlan = screen.getByRole("button", { name: /edit/i });
        expect(editPlan).toBeInTheDocument();
        editPlan.click();
        expect(screen.getByRole("button", { name: /save/i })).toBeInTheDocument;
        expect(screen.getByRole("button", { name: /cancel/i }))
            .toBeInTheDocument;
        expect(screen.getByRole("button", { name: /delete/i }))
            .toBeInTheDocument;
    });
});

describe("User should be able to see a plan description", () => {
    beforeEach(() => {
        localStorage.clear();
        render(
            <PlanView
                plan={DefaultPlans[0]}
                deletePlan={deletePlan}
                editPlan={editPlan}
                modifiedCourses={originalCourses}
                selected={false}
                coursePool={coursePool}
                addToPool={addToPool}
                removeFromPool={removeFromPool}
                reqs={DefaultRequirement}
            />
        );
    });

    test("You can see the plan description", () => {
        const description = screen.getByText(/description/i);
        expect(description).toBeInTheDocument();
    });
});
