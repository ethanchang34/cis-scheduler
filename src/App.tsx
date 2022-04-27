import React, { useEffect, useState } from "react";
import "./App.css";
import { LandingPage } from "./components/LandingPage";
import { CourseSearch } from "./components/CourseSearch";
import { NavBar } from "./components/NavBar";
import { Plan } from "./interfaces/Plan";
import { Course } from "./interfaces/Course";
import { Planner } from "./components/Planner";
import { DefaultPlans, Catalog } from "./data/TestData";
import { Route, Routes, useLocation } from "react-router-dom";

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
        const saved = localStorage.getItem("modifiedCourses");
        if (saved) {
            return JSON.parse(saved);
        } else {
            return originalCourses;
        }
    });
    const [plans, setPlans] = useState<Plan[]>(() => {
        const saved = localStorage.getItem("plans");
        if (saved) {
            return JSON.parse(saved);
        } else {
            return DefaultPlans;
        }
    });

    useEffect(() => {
        localStorage.setItem(
            "modifiedCourses",
            JSON.stringify(modifiedCourses)
        );
    }, [modifiedCourses]);

    useEffect(() => {
        localStorage.setItem("plans", JSON.stringify(plans));
    }, [plans]);

    const resetCourses = () => {
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
        </div>
    );
}

export default App;
