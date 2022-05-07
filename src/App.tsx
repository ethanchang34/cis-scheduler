import React, { useEffect, useState } from "react";
import "./App.css";
import { LandingPage } from "./components/LandingPage";
import { CourseSearch } from "./components/course_search/CourseSearch";
import { NavBar } from "./components/NavBar";
import { Plan } from "./interfaces/Plan";
import { Course } from "./interfaces/Course";
import { Planner } from "./components/planner/Planner";
import { Catalog } from "./data/TestData";
import { UserData } from "./interfaces/UserData";
import { Route, Routes, useLocation } from "react-router-dom";
//import ProtectedRoute from "./login_components/ProtectedRoute";
import styled from "styled-components";
import { getUserMetadata, updateMetadata } from "./data/ParseDataFunctions";
import { useAuth0 } from "@auth0/auth0-react";

export const SectionContent = styled.div`
    max-width: 900px;
    margin: 0 auto;
`;

export const originalCourses: Record<string, Course> = Catalog;

function App(): JSX.Element {
    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
    const [userMetadata, setUserMetadata] = useState<UserData | null>(null);

    useEffect(() => {
        getUserMetadata(
            setUserMetadata,
            user,
            isAuthenticated,
            getAccessTokenSilently
        );
        console.log("logged in");
        if (user && isAuthenticated) {
            localStorage.clear();
        }
    }, [getAccessTokenSilently, user?.sub]);

    useEffect(() => {
        console.log(userMetadata);
        if (user && isAuthenticated && userMetadata) {
            if (userMetadata["CISC275-4-plans"]) {
                console.log("useeffect on metaData was run");
                const stringifiedPlans = JSON.stringify(
                    userMetadata["CISC275-4-plans"]
                );
                localStorage.setItem("CISC275-4-plans", stringifiedPlans);
            }
            if (userMetadata["CISC275-4-modifiedCourses"]) {
                const stringifiedCourses = JSON.stringify(
                    userMetadata["CISC275-4-modifiedCourses"]
                );
                localStorage.setItem(
                    "CISC275-4-modifiedCourses",
                    stringifiedCourses
                );
                const newModifiedCourses = { ...originalCourses };
                Object.values(
                    userMetadata["CISC275-4-modifiedCourses"]
                ).forEach(
                    (val: Course) => (newModifiedCourses[val.code] = val)
                );
                setModifiedCourses({ ...newModifiedCourses });
            }
        }
    }, [userMetadata]);

    const updateUserMetadataPlans = (plans: Plan[]) => {
        const newMetaData = {
            user_metadata: { "CISC275-4-plans": plans }
        };
        const stringified = JSON.stringify(newMetaData);
        updateMetadata(
            stringified,
            user,
            isAuthenticated,
            getAccessTokenSilently
        );
    };

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

    const updateUserMetadataCatalog = (newCourses: Record<string, Course>) => {
        const newMetaData = {
            user_metadata: { "CISC275-4-modifiedCourses": newCourses }
        };
        const stringified = JSON.stringify(newMetaData);
        updateMetadata(
            stringified,
            user,
            isAuthenticated,
            getAccessTokenSilently
        );
    };

    const [coursePool, setCoursePool] = useState<string[]>(() => {
        const saved = localStorage.getItem("CISC275-4-coursePool");
        if (saved) {
            const newCoursePool = JSON.parse(saved);
            return newCoursePool;
        } else {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem(
            "CISC275-4-coursePool",
            JSON.stringify(coursePool)
        );
    }, [coursePool]);

    const resetCourses = () => {
        updateUserMetadataCatalog({});
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
                                    updateUserMetadataCatalog={
                                        updateUserMetadataCatalog
                                    }
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
                                    updateUserMetadataPlans={
                                        updateUserMetadataPlans
                                    }
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
