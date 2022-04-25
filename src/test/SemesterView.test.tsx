import React from "react";
import { render, screen } from "@testing-library/react";
import { SemesterView } from "../components/SemesterView";
import { testCourses } from "./CourseSearch.test";
import { DefaultPlans } from "../data/TestData";

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
