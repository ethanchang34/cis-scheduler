import React, { useState } from "react";
import "./App.css";
import { LandingPage } from "./components/LandingPage";
import { CourseSearch } from "./components/course_search/CourseSearch";
import { NavBar } from "./components/NavBar";
import { Course } from "./interfaces/Course";
import { Planner } from "./components/planner/Planner";
import { Catalog } from "./data/TestData";
import { Route, Routes, useLocation } from "react-router-dom";
//import ProtectedRoute from "./login_components/ProtectedRoute";
import styled from "styled-components";

export const SectionContent = styled.div`
    max-width: 900px;
    margin: 0 auto;
`;

export const originalCourses: Record<string, Course> = Catalog;

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
    const [coursePool, setCoursePool] = useState<string[]>([]);

    const resetCourses = () => {
        localStorage.removeItem("CISC275-4-modifiedCourses");
        setModifiedCourses(originalCourses);
    };

    const addToPool = (course: Course): boolean => {
        if (coursePool.includes(course.code)) {
            return false;
        } else {
            setCoursePool([...coursePool, course.code]);
            return true;
        }
    };

    const removeFromPool = (course: Course) => {
        setCoursePool(
            coursePool.filter(
                (crs: string): boolean =>
                    modifiedCourses[crs].code !== course.code
            )
        );
    };
    const location = useLocation();
    return (
        <div className="App">
            <NavBar></NavBar>
            <div style={{ height: "56px" }}></div>
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
                                    addToPool={addToPool}
                                />
                            }
                        />
                        <Route
                            path="planner"
                            element={
                                <Planner
                                    modifiedCourses={modifiedCourses}
                                    coursePool={coursePool}
                                    addToPool={addToPool}
                                    removeFromPool={removeFromPool}
                                />
                            }
                        />
                        <Route
                            path="*"
                            element={
                                <main style={{ padding: "1rem" }}>
                                    <p>nothing here!</p>
                                </main>
                            }
                        />
                    </Route>
                </Routes>{" "}
            </div>
        </div>
    );
}

export default App;
