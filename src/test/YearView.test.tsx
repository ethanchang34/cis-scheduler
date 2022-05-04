import React from "react";
import { render, screen } from "@testing-library/react";
import { YearView } from "../components/planner/plan/YearView";
import { originalCourses } from "../App";
import { DefaultPlans } from "../data/TestData";
import { Course } from "../interfaces/Course";

const deleteYear = () => {
    return;
};

const editYear = () => {
    return;
};

const addToPool = (course: Course): boolean => {
    if (course) {
        return true;
    } else {
        return false;
    }
};

const removeFromPool = (course: Course) => {
    course.code;
    return;
};

describe("Four buttons: two for winter and summer semester adding, and two for clearing semesters and deleting the year", () => {
    beforeEach(() => {
        localStorage.clear();
        render(
            <YearView
                year={DefaultPlans[0].years[0]}
                yearIdx={0}
                deleteYear={deleteYear}
                editYear={editYear}
                modifiedCourses={originalCourses}
                coursePool={[]}
                addToPool={addToPool}
                removeFromPool={removeFromPool}
            ></YearView>
        );
    });

    test("Two clickable add semester buttons are visible by default", () => {
        const addSem = screen.getAllByRole("button", {
            name: "+ Add Semester"
        });
        expect(addSem.length === 2);
        addSem[0].click();
    });

    test("Two different clickable buttons exist to clear semesters and delete the year", () => {
        const clearSems = screen.getByRole("button", {
            name: "Clear Semesters"
        });
        clearSems.click();
        expect(screen.queryByText("Fall") === null);
        const deleteYear = screen.getByRole("button", { name: "Delete Year" });
        deleteYear.click();
    });
});
