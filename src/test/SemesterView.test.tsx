import React from "react";
import { render, screen } from "@testing-library/react";
import { SemesterView } from "../components/SemesterView";
import { originalCourses } from "../App";
import { DefaultPlans } from "../data/TestData";
import userEvent from "@testing-library/user-event";

const deleteSemester = () => {
    return;
};

const editSemester = () => {
    return;
};

describe("User should be able to delete semesters", () => {
    beforeEach(() => {
        localStorage.clear();
        render(
            <SemesterView
                semester={DefaultPlans[0].years[0].semesters[0]}
                deleteSemester={deleteSemester}
                editSemester={editSemester}
                modifiedCourses={originalCourses}
            />
        );
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
        localStorage.clear();
        render(
            <SemesterView
                semester={DefaultPlans[0].years[0].semesters[0]}
                deleteSemester={deleteSemester}
                editSemester={editSemester}
                modifiedCourses={originalCourses}
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
        courses.forEach((x) => {
            expect(x).not.toBeInTheDocument();
        });
    });
});

describe("User should be able to add a course to a semester", () => {
    beforeEach(() => {
        localStorage.clear();
        render(
            <SemesterView
                semester={DefaultPlans[0].years[0].semesters[0]}
                deleteSemester={deleteSemester}
                editSemester={editSemester}
                modifiedCourses={originalCourses}
            />
        );
    });

    test("You can add a course to semester", () => {
        const subjectInput = screen.getByRole("textbox", {
            name: "Add Course"
        });
        userEvent.type(subjectInput, "CISC 106");
        const addCourse = screen.getByRole("button", { name: /add course/i });
        expect(addCourse).toBeInTheDocument();
        addCourse.click();
        expect(screen.getByText(/CISC 106/i)).toBeInTheDocument();
    });
});
