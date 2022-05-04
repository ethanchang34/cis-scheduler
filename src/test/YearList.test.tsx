import React from "react";
import { render, screen } from "@testing-library/react";
import { YearList } from "../components/planner/plan/YearList";
import { originalCourses } from "../App";
import { DefaultPlans } from "../data/TestData";
import { Course } from "../interfaces/Course";

const deleteYear = () => {
    return;
};

const editYear = () => {
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

describe("User can see a list of years and be able delete a year", () => {
    beforeEach(() => {
        localStorage.clear();
        render(
            <YearList
                years={DefaultPlans[0].years}
                deleteYear={deleteYear}
                editYear={editYear}
                modifiedCourses={originalCourses}
                coursePool={coursePool}
                addToPool={addToPool}
                removeFromPool={removeFromPool}
            />
        );
    });

    test("You can see all 4 years", () => {
        expect(screen.getByText("Year 1")).toBeInTheDocument();
        expect(screen.getByText("Year 2")).toBeInTheDocument();
        expect(screen.getByText("Year 3")).toBeInTheDocument();
        expect(screen.getByText("Year 4")).toBeInTheDocument();
    });

    test("There is a button that allows the user to delete a year", () => {
        const deleteYear = screen.getAllByRole("button", {
            name: /delete year/i
        });
        expect(deleteYear.length).toBe(4);
    });
});
