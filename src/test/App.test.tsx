import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";

test("renders the course name somewhere", () => {
    render(<App />);
    const linkElement = screen.getByText(/CISC275/i);
    expect(linkElement).toBeInTheDocument();
});

describe("Swappable windows to Planner, Course Search, Plans Component.", () => {
    beforeEach(() => {
        render(<App />);
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
    });

    test("Once on the course search page, there is a 'Back' button which routes you back to the page you were on before", () => {
        const buttons = screen.getAllByRole("button");
        let seenButton = false;
        buttons.forEach((x) => {
            if (x.textContent === "Search Courses") {
                seenButton = true;
                const getStarted = x;
                getStarted.click(); // On Course Search Page
                const courseSearch = screen.getByText("Course Search");
                expect(courseSearch).toBeInTheDocument();
                const backText = screen.getByText("Back");
                expect(backText).toBeInTheDocument();
                backText.click();
                const homePage = screen.getByText(/Home Page/i);
                expect(homePage).toBeInTheDocument();
            }
        });
        expect(seenButton).toBe(true);
    });
});

describe("Students can override course's info, but also reset a course back to its default information", () => {
    beforeEach(() => {
        render(<App />);
    });

    test("Users can click on a course to bring up a modal, displaying relevant information.", () => {
        // First need to navigate to course search page.
        const courseSearchButton = screen.getByText("Search Courses");
        courseSearchButton.click();

        const subjectInput = screen.getByLabelText("Subject Area:");
        userEvent.type(subjectInput, "CISC");
        const searchButton = screen.getByText("Search");
        searchButton.click();

        const cisc101Button = screen.getByText(/CISC 101/i);
        cisc101Button.click();

        const dialogRole = screen.getByRole("dialog");
        expect(dialogRole).toBeInTheDocument();
    });
});
