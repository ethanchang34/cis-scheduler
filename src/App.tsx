import React, { useEffect, useState } from "react";
import "./App.css";
import { LandingPage } from "./components/LandingPage";
import { CourseSearch } from "./components/CourseSearch";
import { NavBar } from "./components/NavBar";
import { Plan } from "./interfaces/Plan";
import { Course } from "./interfaces/Course";
import { Year } from "./interfaces/Year";
import { Semester } from "./interfaces/Semester";
import { Planner } from "./components/Planner";
import { DefaultPlans, Catalog } from "./data/TestData";
import { Route, Routes, useLocation } from "react-router-dom";
import styled from "styled-components";
import { StringLiteralLike } from "typescript";
import { Button } from "react-bootstrap";

interface ActiveCourse {
    code: string;
    name: string;
    descr: string;
    credits: string;
    preReq: string;
    restrict: string;
    breadth: string;
    typ: string;
}

export const SectionContent = styled.div`
    max-width: 900px;
    margin: 0 auto;
`;

const initialCourses: Record<string, Record<string, ActiveCourse>> = Catalog;

export const originalCourses: Record<string, Course> = {};

Object.entries(initialCourses).forEach(
    // Big hungo jungo method that fills the original courses object with our own courses.
    ([subjectArea, courseRecord]: [string, Record<string, ActiveCourse>]) => {
        Object.entries(courseRecord).forEach(
            ([courseName, activeCourse]: [string, ActiveCourse]) => {
                const parseSems = activeCourse.typ.split(" ");
                let sems: number[] = [];

                if (parseSems.includes("Fall")) sems = [...sems, 0];
                if (parseSems.includes("Winter")) sems = [...sems, 1];
                if (parseSems.includes("Spring")) sems = [...sems, 2];
                if (parseSems.includes("Summer")) sems = [...sems, 3];

                const parseBreadth = activeCourse.breadth.split(";"); // Isolate university: and A&S: breadths
                let courseBreadth = parseBreadth[0].substring(12); // Grab the university breadth at truncate string to only include breadth
                if (
                    courseBreadth.substring(courseBreadth.length - 10) ===
                    "(HIST &amp"
                ) {
                    courseBreadth = courseBreadth.substring(
                        0,
                        courseBreadth.length - 11
                    );
                }

                const parseCredits = activeCourse.credits;
                let courseCredits = 0;
                if (!parseCredits.includes("-")) {
                    courseCredits = parseInt(parseCredits[1]);
                }

                const newCourse: Course = {
                    code: activeCourse.code, // Gets the code of course form "CISC 101"
                    subjectArea: subjectArea, // "CISC"
                    number: activeCourse.code.substring(5, 8), // Number of course stored as string
                    name: activeCourse.name,
                    descr: activeCourse.descr,
                    tech: false, // All courses are not techs unless user sets them to be.
                    breadth: courseBreadth, // String representing what university breadth the course satisfies,
                    preReq: activeCourse.preReq,
                    restrict: activeCourse.restrict,
                    semsOffered: sems, // Array of numbers of sems offered. Empty array indicates no data, assume all?
                    credits: courseCredits
                };

                originalCourses[courseName] = newCourse;
            }
        );
    }
);

function App(): JSX.Element {
    const [modifiedCourses, setModifiedCourses] = useState<
        Record<string, Course>
    >(() => {
        const saved = localStorage.getItem("CISC275-4-modifiedCourses");
        if (saved) {
            const newModifiedCourses: Record<string, Course> = {
                ...originalCourses
            };
            const modifications: Record<string, Course> = JSON.parse(saved);
            Object.entries(modifications).forEach(
                ([subjectArea, course]: [string, Course]) => {
                    newModifiedCourses[subjectArea] = course;
                }
            );
            return newModifiedCourses;
        } else {
            return originalCourses;
        }
    });
    const [plans, setPlans] = useState<Plan[]>(() => {
        const saved = localStorage.getItem("CISC275-4-plans");
        if (saved) {
            return JSON.parse(saved);
        } else {
            return DefaultPlans;
        }
    });

    useEffect(() => {
        localStorage.setItem("CISC275-4-plans", JSON.stringify(plans));
    }, [plans]);

    const resetCourses = () => {
        localStorage.removeItem("CISC275-4-modifiedCourses");
        setModifiedCourses(originalCourses);
    };

    const addPlan = () => {
        const newPlan: Plan = {
            id: plans.length === 0 ? 0 : plans[plans.length - 1].id + 1,
            title: "New Plan",
            description: "Add description",
            years: []
        };
        setPlans([...plans, newPlan]);
    };

    const editPlan = (id: number, newPlan: Plan) => {
        setPlans(
            plans.map((plan: Plan): Plan => (plan.id === id ? newPlan : plan))
        );
    };

    const deletePlan = (id: number) => {
        setPlans(plans.filter((plan: Plan): boolean => plan.id !== id));
    };

    const downloadCourses = () => {
        const saved = localStorage.getItem("CISC275-4-modifiedCourses");
        let csv = "";
        if (saved) {
            const testCourse: Course = {
                code: "",
                subjectArea: "",
                number: "",
                name: "",
                descr: "",
                tech: false,
                breadth: "",
                preReq: "",
                restrict: "",
                semsOffered: [],
                credits: 0
            };
            const changedCourses: Record<string, Course> = JSON.parse(saved);
            csv = [
                Object.keys(testCourse)
                    .map((val) => '"' + val.toString + '"')
                    .join(","),
                Object.values(changedCourses)
                    .map((course: Course): string =>
                        Object.values(course)
                            .map((val: string | number[] | boolean): string => {
                                return (
                                    '"' +
                                    val.toString().replaceAll('"', '""') +
                                    '"'
                                );
                            })
                            .join(",")
                    )
                    .join("\r\n")
            ].join("\r\n");
        }
        downloadBlob(csv, "CoursesExport.csv", "text/csv;charset=utf-8;");
    };

    const downloadPlans = () => {
        let csv = "";
        if (plans) {
            let header = ["id", "title", "description", "numYears"];
            const yearNumArr = plans.map((p: Plan): number => p.years.length);
            const numYears = Math.max(...yearNumArr);
            for (let i = 0; i < numYears; i++) {
                const j = i * 4;
                header = [
                    ...header,
                    ("semester_" + j) as string,
                    ("semester_" + (j + 1)) as string,
                    ("semester_" + (j + 2)) as string,
                    ("semester_" + (j + 3)) as string
                ];
            }
            const planStrings: string = plans
                .map((p: Plan): string => {
                    const semestersString = p.years
                        .map((y: Year): string => {
                            return y.semesters
                                .map((s: Semester): string => {
                                    return (
                                        '"' +
                                        s.courses
                                            .toString()
                                            .replaceAll('"', '""') +
                                        '"'
                                    );
                                })
                                .join(",");
                        })
                        .join(",");
                    return (
                        '"' +
                        p.id.toString() +
                        '"' +
                        "," +
                        '"' +
                        p.title.toString().replaceAll('"', '""') +
                        '"' +
                        "," +
                        '"' +
                        p.description.toString().replaceAll('"', '""') +
                        '"' +
                        "," +
                        '"' +
                        p.years.length.toString().replaceAll('"', '""') +
                        '"' +
                        "," +
                        semestersString
                    );
                })
                .join("\r\n");

            csv = [header, planStrings].join("\r\n");
            console.log(csv);
            downloadBlob(csv, "PlansExport.csv", "text/csv;charset=utf-8;");
        }
    };

    /** Download contents as a file
     * Source: https://stackoverflow.com/questions/14964035/how-to-export-javascript-array-info-to-csv-on-client-side
     */
    const downloadBlob = (
        content: string,
        filename: string,
        contentType: string
    ) => {
        if (!content) {
            console.log("No saved content");
            return;
        }
        // Create a blob
        const blob = new Blob([content], { type: contentType });
        const url = URL.createObjectURL(blob);

        // Create a link to download it
        const pom = document.createElement("a");
        pom.href = url;
        pom.setAttribute("download", filename);
        pom.click();
    };
    const location = useLocation();
    return (
        <div className="App">
            <NavBar></NavBar>
            {/* <nav>
                    <Link to="/">Home</Link>
                    <Link to="/course-search">Course Search</Link>
                    <Link to="/planner">Planner</Link>
                </nav> */}
            <div className="content">
                <Routes location={location} key={location.pathname}>
                    <Route path="/">
                        <Route index element={<LandingPage />} />
                        <Route
                            path="course-search"
                            element={
                                <CourseSearch
                                    modifiedCourses={modifiedCourses}
                                    resetCourses={resetCourses}
                                    setModifiedCourses={setModifiedCourses}
                                />
                            }
                        />
                        <Route
                            path="planner"
                            element={
                                <Planner
                                    plans={plans}
                                    addPlan={addPlan}
                                    editPlan={editPlan}
                                    deletePlan={deletePlan}
                                    modifiedCourses={modifiedCourses}
                                />
                            }
                        />
                    </Route>
                </Routes>
            </div>
            <Button
                onClick={() => {
                    downloadPlans();
                }}
            >
                Download Plans
            </Button>
            <Button
                onClick={() => {
                    downloadCourses();
                }}
            >
                Download Courses
            </Button>
        </div>
    );
}

export default App;
