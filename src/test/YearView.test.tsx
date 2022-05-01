import React from "react";
import { render, screen } from "@testing-library/react";
// import { YearView } from "../components/YearView";
// import { originalCourses } from "../App";
// import { DefaultPlans } from "../data/TestData";
import App from "../App";

// const deleteYear = () => {
//     return;
// };

// const editYear = () => {
//     return;
// };

describe("User should be able to add a semester to a year", () => {
    beforeEach(() => {
        localStorage.clear();
        render(
            // <YearView
            //     year={DefaultPlans[0].years[0]}
            //     yearIdx={0}
            //     deleteYear={deleteYear}
            //     editYear={editYear}
            //     modifiedCourses={originalCourses}
            // ></YearView>
            <App />
        );
    });

    //this test might require more work since we use a dropdown menu to add semesters
    test("You can add a semester", () => {
        const addSem = screen.getByText(/add semester/i);
        expect(addSem).toBeInTheDocument();
    });
});
