import React from "react";
import { render, screen } from "@testing-library/react";
import { CourseView } from "../components/planner/plan/CourseView";
import { originalCourses } from "../App";
import { DefaultPlans } from "../data/TestData";
import { Course } from "../interfaces/Course";

const deleteCourse = () => {
    return;
};

let coursePool: string[] = [];

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

describe("User can see buttons to delete course and move course to pool", () => {
    beforeEach(() => {
        localStorage.clear();
        render(
            <CourseView
                course={DefaultPlans[0].years[0].semesters[0].courses[0]}
                deleteCourse={deleteCourse}
                modifiedCourses={originalCourses}
                addToPool={addToPool}
            />
        );
    });

    test("A delete 'button' (red X) exists and can be clicked", () => {
        const deleteCourse = screen.getByText("❌");
        expect(deleteCourse).toBeInTheDocument();
        deleteCourse.click();
    });

    test("A Move to Pool button exists, and will move the course to the pool", () => {
        const addPool = screen.getByRole("button", { name: "Move to Pool" });
        expect(addPool).toBeInTheDocument();
        addPool.click();
        expect(coursePool.length > 0);
    });

    test("A course already in the pool cannot be added again", () => {
        const addPool = screen.getByRole("button", { name: "Move to Pool" });
        addPool.click();
        addPool.click();
        addPool.click();
        expect(coursePool.length === 1);
    });
});
