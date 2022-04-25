import React from "react";
import { render, screen } from "@testing-library/react";
import { Course } from "../interfaces/Course";
import { ViewCourseModal } from "../components/ViewCourseModal";

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

const course = testCourses["CISC 210"];

const handleClose = () => {
    return;
};

const editCourse = () => {
    return;
};

describe("Students can establish that a course meets another course's prerequisite.", () => {
    beforeEach(() => {
        render(
            <ViewCourseModal
                show={true}
                handleClose={handleClose}
                code="CISC 210"
                editCourse={editCourse}
                modifiedCourses={testCourses}
            />
        );
    });

    test("Modal displays Course code", () => {
        expect(
            screen.getByText(course.code, { exact: false })
        ).toBeInTheDocument();
    });

    test("Modal displays Course title", () => {
        expect(
            screen.getByText(course.name, { exact: false })
        ).toBeInTheDocument();
    });

    test("Modal displays Course description", () => {
        if (course.descr === "") {
            return;
        }
        expect(
            screen.getByText(course.descr, { exact: false })
        ).toBeInTheDocument();
    });

    test("Modal displays Course prereq", () => {
        expect(screen.getByText(course.preReq)).toBeInTheDocument();
    });
});
