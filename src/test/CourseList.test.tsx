import React from "react";
import { render, screen } from "@testing-library/react";
import { CourseList } from "../components/planner/plan/CourseList";
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

describe("User can see several different courses and information about the courses when semester is expanded", () => {
    beforeEach(() => {
        localStorage.clear();
        render(
            <CourseList
                courses={DefaultPlans[0].years[0].semesters[0].courses}
                deleteCourse={deleteCourse}
                modifiedCourses={originalCourses}
                semSelected={true}
                addToPool={addToPool}
            />
        );
    });

    test("There are four different courses visible with titles", () => {
        const eggg101 = screen.getByText(
            "EGGG 101: Introduction to Engineering"
        );
        const cisc108 = screen.getByText(
            "CISC 108: Introduction to Computer Science I"
        );
        const math241 = screen.getByText(
            "MATH 241: Analytic Geometry and Calculus A"
        );
        const engl110 = screen.getByText("ENGL 110: Seminar in Composition");
        expect(eggg101).toBeInTheDocument();
        expect(cisc108).toBeInTheDocument();
        expect(math241).toBeInTheDocument();
        expect(engl110).toBeInTheDocument();
    });

    test("Credit amounts per course are visible", () => {
        const creditNums = screen.getAllByText(/Credits/i);
        expect(creditNums.length === 4);
    });
});

describe("When the semester is not selected, the courses show titles, but not info", () => {
    beforeEach(() => {
        localStorage.clear();
        render(
            <CourseList
                courses={DefaultPlans[0].years[0].semesters[0].courses}
                deleteCourse={deleteCourse}
                modifiedCourses={originalCourses}
                semSelected={false}
                addToPool={addToPool}
            />
        );
    });

    test("There are four different courses visible with titles", () => {
        const eggg101 = screen.getByText(
            "EGGG 101 Introduction to Engineering"
        );
        const cisc108 = screen.getByText(
            "CISC 108 Introduction to Computer Science I"
        );
        const math241 = screen.getByText(
            "MATH 241 Analytic Geometry and Calculus A"
        );
        const engl110 = screen.getByText("ENGL 110 Seminar in Composition");
        expect(eggg101).toBeInTheDocument();
        expect(cisc108).toBeInTheDocument();
        expect(math241).toBeInTheDocument();
        expect(engl110).toBeInTheDocument();
    });

    test("Credit amounts per course are not visible", () => {
        const creditNums = screen.queryAllByText(/Credits/i);
        expect(creditNums.length === 0);
    });
});
