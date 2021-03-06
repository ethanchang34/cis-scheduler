import React from "react";
import { render, screen } from "@testing-library/react";
import { PlanList } from "../components/planner/PlanList";
import { originalCourses } from "../App";
import { Course } from "../interfaces/Course";
import { DefaultRequirement } from "../data/TestData";
import { Plan } from "../interfaces/Plan";
import { Requirement } from "../interfaces/Requirement";

const coursePool: string[] = [];
const addToPool = (course: Course) => {
    console.log(course);
    return false;
};
const removeFromPool = (course: Course) => {
    console.log(course);
    return;
};

const updateUserMetadataPlans = (plans: Plan[]) => {
    console.log(plans);
};

const setReqs = (req: Requirement) => {
    console.log(req);
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
                updateUserMetadataPlans={updateUserMetadataPlans}
                setReqs={setReqs}
            ></PlanList>
        );
    });

    test("There is a button, which adds a plan", () => {
        const addPlan = screen.getByRole("button", { name: /add plan/i });
        expect(addPlan).toBeInTheDocument();
        addPlan.click();
        expect(screen.getByText(/New Plan/i)).toBeInTheDocument();
    });

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
        });
        expect(titleElement).toBeInTheDocument();
    });

    test("You can see the plan description", () => {
        const descElement = screen.getByText(/Description/i);
        expect(descElement).toBeInTheDocument();
    });
});

describe("User can see a list of requirements", () => {
    beforeEach(() => {
        localStorage.clear();
        render(
            <PlanList
                modifiedCourses={originalCourses}
                coursePool={coursePool}
                addToPool={addToPool}
                removeFromPool={removeFromPool}
                reqs={DefaultRequirement}
                updateUserMetadataPlans={updateUserMetadataPlans}
                setReqs={setReqs}
            />
        );
    });

    test("You can see a Requirement header", () => {
        expect(screen.getByText(/requirements/i)).toBeInTheDocument();
    });

    test("You can see course requirements listed out", () => {
        DefaultRequirement.courses.forEach((course: string) => {
            expect(
                screen.getByText(course, { exact: false })
            ).toBeInTheDocument();
        });
    });
});

describe("User can add or delete a year", () => {
    beforeEach(() => {
        localStorage.clear();
        render(
            <PlanList
                modifiedCourses={originalCourses}
                coursePool={coursePool}
                addToPool={addToPool}
                removeFromPool={removeFromPool}
                reqs={DefaultRequirement}
                updateUserMetadataPlans={updateUserMetadataPlans}
                setReqs={setReqs}
            />
        );
        screen.getByTestId("chevron").click();
    });

    test("There is a button that allows the user to add a year", () => {
        const addYear = screen.getByRole("button", {
            name: /add year/i
        });
        expect(addYear).toBeInTheDocument();
        addYear.click();
        expect(screen.getByText("Year 5")).toBeInTheDocument();
    });

    test("There is a button that allows the user to delete a year", () => {
        const deleteYear = screen.getAllByRole("button", {
            name: /delete year/i
        });
        expect(deleteYear.length).toBe(4);
        deleteYear[0].click();
        expect(screen.getByText("Year 1")).not.toBeInTheDocument;
    });
});

describe("User can add/delete/edit semesters", () => {
    beforeEach(() => {
        localStorage.clear();
        render(
            <PlanList
                modifiedCourses={originalCourses}
                coursePool={coursePool}
                addToPool={addToPool}
                removeFromPool={removeFromPool}
                reqs={DefaultRequirement}
                updateUserMetadataPlans={updateUserMetadataPlans}
                setReqs={setReqs}
            />
        );
        screen.getByTestId("chevron").click();
    });

    test("User can clear all semesters in a plan", () => {
        const clearSems = screen.getByRole("button", {
            name: /clear all semesters/i
        });
        expect(clearSems).toBeInTheDocument();
        clearSems.click();
        const sems = screen.queryAllByText(
            /fall/i || /spring/i || /winter/i || /summer/i
        );
        expect(sems.length).toBe(0);
    });

    test("User can add a winter or summer semester", () => {
        const addSemButtons = screen.getAllByRole("button", {
            name: "+ Add Semester"
        });
        addSemButtons[0].click();
        addSemButtons[1].click();
        expect(screen.getByText(/winter/i)).toBeInTheDocument();
        expect(screen.getByText(/summer/i)).toBeInTheDocument();
    });

    test("User can delete a semester", () => {
        const oldSemNum = screen.getAllByText(
            /fall/i || /spring/i || /winter/i || /summer/i
        );
        const deleteSem = screen.getAllByText("???");
        deleteSem[0].click();
        const newSemNum = screen.getAllByText(
            /fall/i || /spring/i || /winter/i || /summer/i
        );
        expect(newSemNum.length).toBe(oldSemNum.length - 1);
    });
});
