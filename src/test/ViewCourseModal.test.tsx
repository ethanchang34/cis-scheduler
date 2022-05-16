import React from "react";
import { render, screen } from "@testing-library/react";
import { testCourses } from "./CourseSearch.test";
import { ViewCourseModal } from "../components/course_modal/ViewCourseModal";

const course = testCourses["CISC 210"];

const handleClose = () => {
    return;
};

const editCourse = () => {
    return;
};

const addToPool = () => {
    return false;
};

describe("Students can establish that a course meets another course's prerequisite.", () => {
    beforeEach(() => {
        localStorage.clear();
        render(
            <ViewCourseModal
                show={true}
                handleClose={handleClose}
                code="CISC 210"
                editCourse={editCourse}
                modifiedCourses={testCourses}
                addToPool={addToPool}
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
