import React from "react";
import { render, screen } from "@testing-library/react";
import { SemesterView } from "../components/planner/plan/SemesterView";
import { originalCourses } from "../App";
import { DefaultPlans } from "../data/TestData";
// import userEvent from "@testing-library/user-event";
import { Course } from "../interfaces/Course";
import userEvent from "@testing-library/user-event";

const modifiedCourses = originalCourses;

const deleteSemester = () => {
    return;
};

const editSemester = () => {
    return;
};

let coursePool: string[] = ["EGGG 101"];

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

describe("User can see basic information in minimized semester", () => {
    beforeEach(() => {
        localStorage.clear();
        render(
            <SemesterView
                semester={DefaultPlans[0].years[0].semesters[0]}
                idx={0}
                deleteSemester={deleteSemester}
                editSemester={editSemester}
                modifiedCourses={originalCourses}
                selected={false}
                coursePool={coursePool}
                addToPool={addToPool}
                removeFromPool={removeFromPool}
            />
        );
    });

    // test("You can delete a semester", () => {
    //     const oldSems = screen.getAllByText(
    //         /fall/i || /winter/i || /spring/i || /summer/i
    //     );
    //     const deleteSem = screen.getByRole("button", {
    //         name: /delete semester/i
    //     });
    //     expect(deleteSem).toBeInTheDocument();
    //     deleteSem.click();
    //     const newSems = screen.getAllByText(
    //         /fall/i || /winter/i || /spring/i || /summer/i
    //     );
    //     expect(newSems.length).toBe(oldSems.length - 1);
    // });

    test("Semester title and credit count are visible", () => {
        const semTitle = screen.getByText("Fall");
        const semCredits = screen.getByText(/Semester Credits/i);
        expect(semTitle).toBeInTheDocument();
        expect(semCredits).toBeInTheDocument();
    });

    test("Delete 'button' (red X) is visible and can be clicked", () => {
        const deleteButton = screen.getByText("❌");
        expect(deleteButton).toBeInTheDocument();
        deleteButton.click();
    });
});

describe("User can see more information, as well as course adding methods, when expanded", () => {
    beforeEach(() => {
        localStorage.clear();
        render(
            <SemesterView
                semester={DefaultPlans[0].years[0].semesters[0]}
                idx={0}
                deleteSemester={deleteSemester}
                editSemester={editSemester}
                modifiedCourses={originalCourses}
                selected={true}
                coursePool={coursePool}
                addToPool={addToPool}
                removeFromPool={removeFromPool}
            />
        );
    });

    test("Both ways of adding a course are visible and can be changed", () => {
        const byCode = screen.getByText("Add Course by Code");
        const fromPool = screen.getByText("Add Course from Pool");
        expect(byCode).toBeInTheDocument();
        expect(fromPool).toBeInTheDocument();

        const codeInput = screen.getByLabelText("Add Course by Code");
        userEvent.type(codeInput, "CISC 108");
        expect(codeInput).toHaveValue("CISC 108");

        const poolSwitch = screen.getByLabelText("Add Course from Pool");
        const switchCourse = screen.getByRole("option", { name: "EGGG 101" });
        userEvent.selectOptions(poolSwitch, switchCourse);
        expect(poolSwitch).toHaveValue("EGGG 101");
    });

    test("All buttons are visible and clickable", () => {
        const moveButtons = screen.getAllByRole("button", {
            name: "Move to Pool"
        });
        expect(moveButtons.length === 4);
        moveButtons[0].click();

        const addButtons = screen.getAllByRole("button", { name: "Add" });
        expect(addButtons.length === 2);
        addButtons[0].click();

        const clearButton = screen.getAllByRole("button", {
            name: "Clear Courses"
        });
        expect(clearButton.length === 1);
        clearButton[0].click();
    });
});

// describe("User should be able to clear all courses from a semester", () => {
//     beforeEach(() => {
//         localStorage.clear();
//         render(
//             // <SemesterView
//             //     semester={DefaultPlans[0].years[0].semesters[0]}
//             //     idx={0}
//             //     deleteSemester={deleteSemester}
//             //     editSemester={editSemester}
//             //     modifiedCourses={originalCourses}
//             // />
//             <App></App>
//         );
//     });

//     test("You can clear all courses in a semester", () => {
//         const clearCourses = screen.getByRole("button", {
//             name: /clear courses/i
//         });
//         expect(clearCourses).toBeInTheDocument();
//         clearCourses.click();
//         const courses = screen.getAllByText(
//             /EGGG 101/i || /CISC 108/i || /MATH 241/i || /ENGL 110/i
//         );
//         courses.forEach((x) => {
//             expect(x).not.toBeInTheDocument();
//         });
//     });
// });

// describe("User should be able to add a course to a semester", () => {
//     beforeEach(() => {
//         localStorage.clear();
//         render(
//             // <SemesterView
//             //     semester={DefaultPlans[0].years[0].semesters[0]}
//             //     idx={0}
//             //     deleteSemester={deleteSemester}
//             //     editSemester={editSemester}
//             //     modifiedCourses={originalCourses}
//             // />
//             <App></App>
//         );
//     });

//     test("You can add a course to semester", () => {
//         const subjectInput = screen.getByRole("textbox", {
//             name: "Add Course"
//         });
//         userEvent.type(subjectInput, "CISC 106");
//         const addCourse = screen.getByRole("button", { name: /add course/i });
//         expect(addCourse).toBeInTheDocument();
//         addCourse.click();
//         expect(screen.getByText(/CISC 106/i)).toBeInTheDocument();
//     });
// });
