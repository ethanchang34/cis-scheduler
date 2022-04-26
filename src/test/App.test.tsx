import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";

describe("Swappable windows to Planner, Course Search, Plans Component.", () => {
    beforeEach(() => {
        localStorage.clear();
        render(<App />);
        window.location.replace("http://localhost:3000/");
    });
    afterEach(() => {
        window.location.replace("http://localhost:3000/");
    });

    test("App starts on the Home Page", () => {
        const linkElement = screen.getByText(/Home Page/i);
        expect(linkElement).toBeInTheDocument();
    });

    test("renders three buttons on screen", () => {
        const buttons = screen.getAllByRole("button");
        expect(buttons.length).toBe(3);
    });

    test("'Get Started' is the text on one of the buttons and clicking it routes you to the course page.", () => {
        const buttons = screen.getAllByRole("button");
        let seenButton = false;
        buttons.forEach((x) => {
            if (x.textContent === "Get Started") {
                seenButton = true;
                const getStarted = x;
                getStarted.click();
                const linkElement = screen.getByText(/Plans/i);
                expect(linkElement).toBeInTheDocument();
            }
        });
        expect(seenButton).toBe(true);
        const home = screen.getByRole("button", { name: /home/i });
        home.click();
    });

    test("'Course Searches' is the text on one of the buttons and clicking it routes you to the course search page.", () => {
        const buttons = screen.getAllByRole("button");
        let seenButton = false;
        buttons.forEach((x) => {
            if (x.textContent === "Search Courses") {
                seenButton = true;
                const getStarted = x;
                getStarted.click();
                const homePage = screen.queryByText(/Home Page/i);
                expect(homePage).not.toBeInTheDocument();
                const courseSearch = screen.getByText("Course Search");
                expect(courseSearch).toBeInTheDocument();
            }
        });
        expect(seenButton).toBe(true);
        const back = screen.getByRole("button", { name: /back/i });
        back.click();
    });

    test("Once on the course search page, there is a 'Back' button which routes you back to the page you were on before", () => {
        const courseSearch = screen.getByRole("button", {
            name: "Search Courses"
        });
        expect(courseSearch).toBeInTheDocument();
        courseSearch.click();
        const back = screen.getByRole("button", { name: "Back" });
        expect(back).toBeInTheDocument();
        back.click();
        const homePage = screen.getByText(/Home Page/i);
        expect(homePage).toBeInTheDocument();
    });
});

// describe("Students can override course's info, but also reset a course back to its default information", () => {
//     beforeEach(() => {
//         localStorage.clear();
//         render(<App />);
//     });

//     test("Users can click on a course to bring up a modal, displaying relevant information.", () => {
//         // First need to navigate to course search page.
//         const courseSearchButton = screen.getByText("Search Courses");
//         courseSearchButton.click();

//         const subjectInput = screen.getByLabelText("Subject Area:");
//         userEvent.type(subjectInput, "CISC");
//         const searchButton = screen.getByText("Search");
//         searchButton.click();

//         const cisc101Button = screen.getByText(/CISC 101/i);
//         cisc101Button.click();

//         const dialogRole = screen.getByRole("dialog"); // The modal is already tested to display the courses information
//         expect(dialogRole).toBeInTheDocument();
//     });

//     test("Users can edit tile of course, and revert it using the course search button", () => {
//         // First need to navigate to course search page.
//         const courseSearchButton = screen.getByText("Search Courses");
//         courseSearchButton.click();

//         const subjectInput = screen.getByLabelText("Subject Area:");
//         userEvent.type(subjectInput, "CISC");
//         const searchButton = screen.getByText("Search");
//         searchButton.click();

//         const cisc101Button = screen.getByText(/CISC 101/i);
//         cisc101Button.click();

//         const editButton = screen.getByRole("button", { name: /Edit/i });
//         editButton.click();

//         const courseTitleInput = screen.getByLabelText(/Edit Title:/);
//         userEvent.clear(courseTitleInput);
//         userEvent.type(courseTitleInput, "Test Title");

//         const saveButton = screen.getByText(/Save/i);
//         saveButton.click();

//         expect(screen.getAllByText(/CISC 101 Test Title/i).length).toBe(2);

//         const cancelButton = screen.getByRole("button", { name: /Close/i });
//         cancelButton.click();

//         const dialogRole = screen.queryByRole("dialog"); // The modal is already tested to display the courses information
//         expect(dialogRole).not.toBeInTheDocument();

//         const resetButton = screen.getByRole("button", {
//             name: /Reset Course Changes/i
//         });
//         resetButton.click();

//         expect(
//             screen.queryByText(/CISC 101 Test Title/i)
//         ).not.toBeInTheDocument();
//     });
// });
