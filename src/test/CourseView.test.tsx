import React from "react";
import { render, screen } from "@testing-library/react";
// import { CourseView } from "../components/CourseView";
// import { originalCourses } from "../App";
// import { DefaultPlans } from "../data/TestData";
import App from "../App";

// const deleteCourse = () => {
//     return;
// };

describe("User should be able to delete a course from a semester", () => {
    beforeEach(() => {
        localStorage.clear();
        render(
            // <CourseView
            //     course={DefaultPlans[0].years[0].semesters[0].courses[0]}
            //     deleteCourse={deleteCourse}
            //     modifiedCourses={originalCourses}
            // />
            <App></App>
        );
    });

    test("You can delete a course", () => {
        const deleteCourse = screen.getByRole("button", { name: "-" });
        expect(deleteCourse).toBeInTheDocument();
        deleteCourse.click();
        expect(screen.queryByText(/EGGG 101/i)).not.toBeInTheDocument();
    });
});
