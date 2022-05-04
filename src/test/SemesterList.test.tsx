import React from "react";
import { render, screen } from "@testing-library/react";
import { SemesterList } from "../components/planner/plan/SemesterList";
import { originalCourses } from "../App";
import { DefaultPlans } from "../data/TestData";
import { Course } from "../interfaces/Course";

const modifiedCourses = originalCourses;

const addSemester = () => {
    return;
};

const deleteSemester = () => {
    return;
};

const editSemester = () => {
    return;
};

let coursePool: string[] = [];

const setCoursePool = (courses: string[]) => {
    coursePool = [...courses];
};

const addToPool = (course: Course): boolean => {
    if (coursePool.includes(course.code)) {
        return false;
    } else {
        setCoursePool([...coursePool, course.code]);
        return true;
    }
};

const removeFromPool = (course: Course) => {
    setCoursePool(
        coursePool.filter(
            (crs: string): boolean => modifiedCourses[crs].code !== course.code
        )
    );
};

describe("Users should be able to view a list of semesters", () => {
    beforeEach(() => {
        localStorage.clear();
        render(
            <SemesterList
                semesters={DefaultPlans[0].years[0].semesters}
                addSemester={addSemester}
                deleteSemester={deleteSemester}
                editSemester={editSemester}
                modifiedCourses={originalCourses}
                coursePool={coursePool}
                addToPool={addToPool}
                removeFromPool={removeFromPool}
            />
        );
    });

    test("You can see fall and spring semesters by default", () => {
        const fall = screen.getByText(/Fall/i);
        const spring = screen.getByText(/Spring/i);
        expect(fall).toBeInTheDocument();
        expect(spring).toBeInTheDocument();
    });

    test("There are clickable buttons to toggle on winter and summer semesters", () => {
        const addSemButtons = screen.getAllByRole("button", {
            name: "+ Add Semester"
        });
        expect(addSemButtons.length === 2);
        addSemButtons[0].click();
    });

    test("Clicking the chevron on an active semester expands it, then clicking again minimizes it", () => {
        const semChevrons = screen.getAllByTestId("chevron");
        expect(semChevrons.length === 2);
        semChevrons[0].click();
        const poolButtons = screen.getAllByRole("button", {
            name: "Move to Pool"
        });
        expect(poolButtons.length === 4);
        const expandedChevron = screen.getByTestId("chevron");
        expandedChevron.click();
        expect(poolButtons.length === 0);
    });
});
