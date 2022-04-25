import React from "react";
import { render, screen } from "@testing-library/react";
import { SemesterList } from "../components/SemesterList";
import { originalCourses } from "../App";
import { DefaultPlans } from "../data/TestData";

const deleteSemester = () => {
    return;
};

const editSemester = () => {
    return;
};

describe("Users should be able to view a list of semesters", () => {
    beforeEach(() => {
        render(
            <SemesterList
                semesters={DefaultPlans[0].years[0].semesters}
                deleteSemester={deleteSemester}
                editSemester={editSemester}
                modifiedCourses={originalCourses}
            />
        );
    });

    test("You can see fall, winter, spring, summmer semesters", () => {
        const fall = screen.getByText(/fall/i);
        const winter = screen.getByText(/winter/i);
        const spring = screen.getByText(/spring/i);
        const summer = screen.getByText(/summer/i);
        expect(fall).toBeInTheDocument();
        expect(winter).toBeInTheDocument();
        expect(spring).toBeInTheDocument();
        expect(summer).toBeInTheDocument();
    });
});
