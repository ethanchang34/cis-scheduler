import React from "react";
import { render, screen } from "@testing-library/react";
import { CourseSearch } from "../components/CourseSearch";
import { Course } from "../interfaces/Course";
import userEvent from "@testing-library/user-event";

const testCourses: Record<string, Course> = {
    "CISC 101": {
        breadth: "Mathematics, Natural Sciences and Technology",
        code: "CISC 101",
        credits: 3,
        descr: "Introduces students to the central ideas of computing and computer science including programs, algorithms, abstraction, the internet, and information systems. Instills ideas and practices of computational thinking and engages students in activities that show how computing and computer science change the world. Explores computing as a creative activity and empowers students to apply computational thinking to all disciplines including the arts, humanities, business, social and physical sciences, health, and entertainment.",
        name: "Principles of Computing",
        number: "101",
        preReq: "",
        restrict: "",
        semsOffered: [1, 2],
        subjectArea: "CISC",
        tech: false
    },

    "CISC 103": {
        breadth: "Mathematics, Natural Sciences and Technology",
        code: "CISC 103",
        credits: 3,
        descr: "Principles of computer science illustrated through programming in scripting languages such as JavaScript and VBScript. Topics include control structures, arrays, functions, and procedures. Programming projects illustrate web-based applications.",
        name: "Introduction to Computer Science with Web Applications",
        number: "103",
        preReq: "",
        restrict: "Open to non-majors.",
        semsOffered: [0, 2],
        subjectArea: "CISC",
        tech: false
    },

    "CISC 210": {
        breadth: "",
        code: "CISC 210",
        credits: 3,
        descr: "",
        name: "Introduction to Systems Programming",
        number: "210",
        preReq: "A grade of C- or better in CISC 106 or CISC 108.",
        restrict: "",
        semsOffered: [0, 2],
        subjectArea: "CISC",
        tech: false
    },

    "AFRA 204": {
        breadth: "Social and Behavioral Sciences",
        code: "AFRA 204",
        credits: 3,
        descr: "Urbanization, rural-urban social differences and the organization of urban communities by race, class, ethnicity and stage in the life cycle.",
        name: "Urban Communities",
        number: "204",
        preReq: "",
        restrict: "",
        semsOffered: [],
        subjectArea: "AFRA",
        tech: false
    },

    "AFRA 107": {
        breadth: "History and Cultural Change",
        code: "AFRA 107",
        credits: 3,
        descr: "The study of various styles of rock music. Introduction to folk, country, blues, and jazz as predecessors to rock. Intended for the non-music major. No music reading skills required.",
        name: "History of Rock",
        number: "107",
        preReq: "",
        restrict: "",
        semsOffered: [],
        subjectArea: "AFRA",
        tech: false
    },

    "AFRA 206": {
        breadth: "Creative Arts and Humanities",
        code: "AFRA 206",
        credits: 3,
        descr: "Historic and contemporary aspects of African American culture. A multi-faceted approach utilizing resources from music, literature, history, folklore, religion and sociology.",
        name: "Survey of African American Culture",
        number: "206",
        preReq: "",
        restrict: "",
        semsOffered: [2],
        subjectArea: "AFRA",
        tech: false
    },

    "AFRA 222": {
        breadth: "History and Cultural Change",
        code: "AFRA 222",
        credits: 3,
        descr: "",
        name: "Racial Politics in Today’s Sports",
        number: "222",
        preReq: "",
        restrict: "",
        semsOffered: [1, 3],
        subjectArea: "AFRA",
        tech: false
    }
};

const resetCourses = () => {
    return;
};

const setModifiedCourses = () => {
    return;
};

describe("Course search page has a input text bar and displays all matching courses in data.  ", () => {
    beforeEach(() => {
        render(
            <CourseSearch
                modifiedCourses={testCourses}
                setModifiedCourses={setModifiedCourses}
                resetCourses={resetCourses}
            />
        );
    });

    test("renders 'Search Courses' somehwere", () => {
        const linkElement = screen.getByText(/Search Courses/i);
        expect(linkElement).toBeInTheDocument();
    });

    test("There is a search input button and a reset course changes", () => {
        const searchButton = screen.getByText("Search");
        expect(searchButton).toBeInTheDocument();
    });

    test("There is a subject area text form", () => {
        const subjectInput = screen.getByLabelText("Subject Area:");
        expect(subjectInput).toBeInTheDocument();
    });

    test("User can filter by department", () => {
        const subjectInput = screen.getByLabelText("Subject Area:");
        userEvent.type(subjectInput, "CISC");
        const searchButton = screen.getByText("Search");
        searchButton.click();
        expect(screen.getByText(/CISC 101/i)).toBeInTheDocument();
        expect(screen.getByText(/CISC 103/i)).toBeInTheDocument();
        expect(screen.queryByText(/AFRA/i)).not.toBeInTheDocument();
    });

    test("User can filter by course number", () => {
        const subjectInput = screen.getByLabelText("Course Number:");
        userEvent.type(subjectInput, "1");
        const searchButton = screen.getByText("Search");
        searchButton.click();
        expect(screen.getByText(/CISC 101/i)).toBeInTheDocument();
        expect(screen.getByText(/CISC 103/i)).toBeInTheDocument();
        expect(screen.getByText(/AFRA 107/i)).toBeInTheDocument();
        expect(screen.queryByText(/AFRA 206/i)).not.toBeInTheDocument();
    });

    test("User can filter by semester", () => {
        const fallInput = screen.getByLabelText("Fall");
        fallInput.click();
        const searchButton = screen.getByText("Search");
        searchButton.click();

        expect(screen.queryByText(/CISC 103/i)).toBeInTheDocument();
        expect(screen.queryByText(/CISC 101/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/AFRA 107/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/AFRA 204/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/AFRA 206/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/AFRA 222/i)).not.toBeInTheDocument();

        fallInput.click();
        const winterInput = screen.getByLabelText("Winter");
        winterInput.click();
        searchButton.click();

        expect(screen.queryByText(/CISC 101/i)).toBeInTheDocument();
        expect(screen.queryByText(/CISC 103/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/AFRA 107/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/AFRA 204/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/AFRA 206/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/AFRA 222/i)).toBeInTheDocument();

        winterInput.click();
        const springInput = screen.getByLabelText("Spring");
        springInput.click();
        searchButton.click();

        expect(screen.queryByText(/CISC 101/i)).toBeInTheDocument();
        expect(screen.queryByText(/CISC 103/i)).toBeInTheDocument();
        expect(screen.queryByText(/AFRA 107/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/AFRA 204/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/AFRA 206/i)).toBeInTheDocument();
        expect(screen.queryByText(/AFRA 222/i)).not.toBeInTheDocument();

        springInput.click();
        const summerInput = screen.getByLabelText("Summer");
        summerInput.click();
        searchButton.click();

        expect(screen.queryByText(/CISC 101/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/CISC 103/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/AFRA 107/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/AFRA 204/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/AFRA 206/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/AFRA 222/i)).toBeInTheDocument();
    });

    test("User can filter by breadth", () => {
        expect(screen.queryByText(/CISC 101/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/CISC 103/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/AFRA 107/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/AFRA 204/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/AFRA 206/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/AFRA 222/i)).not.toBeInTheDocument();

        const creative = screen.getByLabelText("Creative Arts and Humanities");
        creative.click();
        const searchButton = screen.getByText("Search");
        searchButton.click();

        expect(screen.queryByText(/CISC 101/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/CISC 103/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/AFRA 107/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/AFRA 204/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/AFRA 206/i)).toBeInTheDocument();
        expect(screen.queryByText(/AFRA 222/i)).not.toBeInTheDocument();

        const history = screen.getByLabelText("History and Cultural Change");
        creative.click();
        history.click();
        searchButton.click();

        expect(screen.queryByText(/CISC 101/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/CISC 103/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/AFRA 107/i)).toBeInTheDocument();
        expect(screen.queryByText(/AFRA 204/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/AFRA 206/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/AFRA 222/i)).toBeInTheDocument();

        const social = screen.getByLabelText("Social and Behavioral Sciences");
        history.click();
        social.click();
        searchButton.click();

        expect(screen.queryByText(/CISC 101/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/CISC 103/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/AFRA 107/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/AFRA 204/i)).toBeInTheDocument();
        expect(screen.queryByText(/AFRA 206/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/AFRA 222/i)).not.toBeInTheDocument();

        const math = screen.getByLabelText(
            "Mathematics, Natural Sciences and Technology"
        );
        social.click();
        math.click();
        searchButton.click();

        expect(screen.queryByText(/CISC 101/i)).toBeInTheDocument();
        expect(screen.queryByText(/CISC 103/i)).toBeInTheDocument();
        expect(screen.queryByText(/AFRA 107/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/AFRA 204/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/AFRA 206/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/AFRA 222/i)).not.toBeInTheDocument();
    });
});
