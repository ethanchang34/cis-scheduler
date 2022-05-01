import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";
// import { SemesterList } from "../components/SemesterList";
// import { originalCourses } from "../App";
// import { DefaultPlans } from "../data/TestData";

// const addSemester = () => {
//     return;
// };

// const deleteSemester = () => {
//     return;
// };

// const editSemester = () => {
//     return;
// };

describe("Users should be able to view a list of semesters", () => {
    beforeEach(() => {
        localStorage.clear();
        render(
            // <SemesterList
            //     semesters={DefaultPlans[0].years[0].semesters}
            //     addSemester={addSemester}
            //     deleteSemester={deleteSemester}
            //     editSemester={editSemester}
            //     modifiedCourses={originalCourses}
            // />
            <App></App>
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
