import React from "react";
import { render, screen } from "@testing-library/react";
import { SemesterView } from "../components/SemesterView";
import { testCourses } from "./CourseSearch.test";
import { DefaultPlans } from "../data/TestData";
import userEvent from "@testing-library/user-event";

const deleteSemester = () => {
    return;
};

const editSemester = () => {
    return;
};

describe("User should be able to add and delete semesters", () => {
    beforeEach(() => {
        render(
            <SemesterView
                semester={DefaultPlans[0].years[0].semesters[0]}
                deleteSemester={deleteSemester}
                editSemester={editSemester}
                modifiedCourses={testCourses}
            />
        );
    });

    //this test might require more work since we use a dropdown menu to add semesters
    test("You can add a semester", () => {
        const addSem = screen.getByText(/add semester/i);
        expect(addSem).toBeInTheDocument();
    });

    test("You can delete a semester", () => {
        const oldSems = screen.getAllByText(
            /fall/i || /winter/i || /spring/i || /summer/i
        );
        const deleteSem = screen.getByRole("button", {
            name: /delete semester/i
        });
        expect(deleteSem).toBeInTheDocument();
        deleteSem.click();
        const newSems = screen.getAllByText(
            /fall/i || /winter/i || /spring/i || /summer/i
        );
        expect(newSems.length).toBe(oldSems.length - 1);
    });
});

describe("User should be able to clear all courses from a semester", () => {
    beforeEach(() => {
        render(
            <SemesterView
                semester={DefaultPlans[0].years[0].semesters[0]}
                deleteSemester={deleteSemester}
                editSemester={editSemester}
                modifiedCourses={testCourses}
            />
        );
    });

    test("You can clear all courses in a semester", () => {
        const clearCourses = screen.getByRole("button", {
            name: /clear courses/i
        });
        expect(clearCourses).toBeInTheDocument();
        clearCourses.click();
        const courses = screen.getAllByText(
            /EGGG 101/i || /CISC 108/i || /MATH 241/i || /ENGL 110/i
        );
        expect(courses).not.toBeInTheDocument();
    });
});

describe("User should be able to add a course to a semester", () => {
    beforeEach(() => {
        render(
            <SemesterView
                semester={DefaultPlans[0].years[0].semesters[0]}
                deleteSemester={deleteSemester}
                editSemester={editSemester}
                modifiedCourses={testCourses}
            />
        );
    });

    test("You can add a course to semester", () => {
        const subjectInput = screen.getByLabelText(/Add Course/i);
        userEvent.type(subjectInput, "CISC 106");
        const addCourse = screen.getByRole("button", { name: /add/i });
        expect(addCourse).toBeInTheDocument();
        addCourse.click();
        expect(screen.getByText(/cisc 106/i)).toBeInTheDocument();
    });
});
