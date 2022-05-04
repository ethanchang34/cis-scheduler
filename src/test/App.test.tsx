import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

describe("Swappable windows to Planner, Course Search, Plans Component.", () => {
    beforeEach(() => {
        render(
            <MemoryRouter initialEntries={["/"]}>
                <App />
            </MemoryRouter>
        );
    });

    test("App starts on the Home Page", () => {
        const linkElement = screen.getByText(/Home/i);
        expect(linkElement).toBeInTheDocument();
    });

    test("renders four buttons on screen", () => {
        const buttons = screen.getAllByRole("button");
        expect(buttons.length).toBe(4);
    });

    test("'Get Started' is the text on one of the buttons and clicking it routes you to the course page.", () => {
        const getStarted = screen.getByRole("button", { name: "Get Started" });

        getStarted.click();
        const linkElement = screen.queryByText("Plans");
        expect(linkElement).toBeInTheDocument();
    });

    test("'Course Searches' is the text on one of the buttons and clicking it routes you to the course search page.", () => {
        const searchCourses = screen.getByRole("button", {
            name: "Search Courses"
        });
        searchCourses.click();
        const homePage = screen.queryByText(/Home/i);
        expect(homePage).not.toBeInTheDocument();
        const courseSearch = screen.getByText("Course Search");
        expect(courseSearch).toBeInTheDocument();
    });

    test("Once on the course search page, there is a 'Back' button which routes you back to the page you were on before", () => {
        const courseSearch = screen.getByRole("button", {
            name: "Search Courses"
        });
        courseSearch.click();
        const back = screen.getByRole("button", { name: "Back" });
        back.click();
        const homePage = screen.getByText(/Home/i);
        expect(homePage).toBeInTheDocument();
    });
});

describe("Students can override course's info, but also reset a course back to its default information", () => {
    beforeEach(() => {
        window.localStorage.clear();
        render(
            <MemoryRouter initialEntries={["/"]}>
                <App />
            </MemoryRouter>
        );
    });

    test("Users can click on a course to bring up a modal, displaying relevant information.", () => {
        // First need to navigate to course search page.\
        const searchCourses = screen.getByRole("button", {
            name: "Search Courses"
        });
        searchCourses.click();

        const subjectInput = screen.getByLabelText("Subject Area:");
        userEvent.type(subjectInput, "CISC");
        const searchButton = screen.getByText("Search");
        searchButton.click();

        const cisc101Button = screen.getByText(/CISC 101/i);
        cisc101Button.click();

        const dialogRole = screen.getByRole("dialog"); // The modal is already tested to display the courses information
        expect(dialogRole).toBeInTheDocument();
    });

    test("Users can edit tile of course, and revert it using the course search button", () => {
        // First need to navigate to course search page.
        const searchCourses = screen.getByRole("button", {
            name: "Search Courses"
        });
        searchCourses.click();

        const subjectInput = screen.getByLabelText("Subject Area:");
        userEvent.type(subjectInput, "CISC");
        const searchButton = screen.getByText("Search");
        searchButton.click();

        const cisc101Button = screen.getByText(/CISC 101/i);
        cisc101Button.click();

        const editButton = screen.getByRole("button", { name: /Edit/i });
        editButton.click();

        const courseTitleInput = screen.getByLabelText(/Edit Title:/);
        userEvent.clear(courseTitleInput);
        userEvent.type(courseTitleInput, "Test Title");

        const saveButton = screen.getByText(/Save/i);
        saveButton.click();

        expect(screen.getAllByText(/CISC 101 Test Title/i).length).toBe(2);

        const cancelButton = screen.getByRole("button", { name: /Close/i });
        cancelButton.click();

        const dialogRole = screen.queryByRole("dialog"); // The modal is already tested to display the courses information
        expect(dialogRole).not.toBeInTheDocument();

        const resetButton = screen.getByRole("button", {
            name: /Reset Course Changes/i
        });
        resetButton.click();

        expect(
            screen.queryByText(/CISC 101 Test Title/i)
        ).not.toBeInTheDocument();
    });
});

describe("Students can save their current degree plan and laod plans between sessions.", () => {
    beforeEach(() => {
        Object.defineProperty(window, "localStorage", {
            value: {
                getItem: jest.fn(() => null),
                setItem: jest.fn(() => null)
            },
            writable: true
        });
        render(
            <MemoryRouter initialEntries={["/"]}>
                <App />
            </MemoryRouter>
        );
    });

    test("App starts on the Home Page", () => {
        const linkElement = screen.getByText(/Home/i);
        expect(linkElement).toBeInTheDocument();
    });

    test("User can navigate to the plans and select the default plan", () => {
        screen.getByRole("button", { name: "Get Started!" }).click();
        expect(screen.queryByText("Default Plan")).toBeInTheDocument();
        console.log(screen.getAllByTestId("chevron").length);
    });
});
