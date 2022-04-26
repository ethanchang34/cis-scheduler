import React from "react";
import { render, screen } from "@testing-library/react";
import { LandingPage } from "../components/LandingPage";

describe("Create landing page UI Students are introduced to the application with a friendly message that clearly explains their goal and how they should get started.", () => {
    beforeEach(() => {
        render(<LandingPage />);
    });

    test("renders the course name somewhere", () => {
        const linkElement = screen.getByText(/UD CISC/i);
        expect(linkElement).toBeInTheDocument();
    });

    test("renders the title course", () => {
        const linkElement = screen.getByText(/Course Schedule Planner/i);
        expect(linkElement).toBeInTheDocument();
    });

    test("instructions for different personas appear on screen", () => {
        const freshman = screen.getByText(/Freshman/i);
        expect(freshman).toBeInTheDocument();

        const sophomore = screen.getByText(/Sophomore/i);
        expect(sophomore).toBeInTheDocument();

        const junior = screen.getByText(/Junior/i);
        expect(junior).toBeInTheDocument();
    });

    test("There is 1 button", () => {
        const buttons = screen.getAllByRole("button");
        expect(buttons.length).toBe(1);
        expect(screen.getByText(/Get Started!/i)).toBeInTheDocument();
    });
});
