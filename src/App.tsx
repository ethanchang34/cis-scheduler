import React, { useState } from "react";
import "./App.css";
import { LandingPage } from "./LandingPage";
import { CourseSearch } from "./CourseSearch";
import { Course } from "./interfaces/Course";
import { Plan } from "./interfaces/Plan";
import { Button } from "react-bootstrap";
import { PlansList } from "./PlansList";
import { NavBar } from "./NavBar";

const originalCourses: Course[] = [];

function App(): JSX.Element {
    const [modifiedCourses, setModifiedCourses] =
        useState<Course[]>(originalCourses);
    const [plans, setPlans] = useState<Plan[]>([]);
    const [search, setSearch] = useState<boolean>(false);
    const [landing, setLanding] = useState<boolean>(true);

    const flipLanding = () => {
        setLanding(!landing);
    };

    const flipSearch = () => {
        setSearch(!search);
    };

    return (
        <div className="App">
            <NavBar
                landing={landing}
                flipLanding={flipLanding}
                search={search}
                flipSearch={flipSearch}
            ></NavBar>
            <div style={{ display: !search ? "block" : "none" }}>
                {landing && (
                    <LandingPage flipLanding={flipLanding}></LandingPage> // I unrender this component when I don't need it because it contains to state.
                )}
                <div style={{ display: !landing ? "block" : "none" }}>
                    {/*I only set this component to display none because I want it to remain the same after switching to and from course search. */}
                    <PlansList></PlansList>
                </div>
            </div>
            <div style={{ display: search ? "block" : "none" }}>
                <CourseSearch></CourseSearch>
            </div>
        </div>
    );
}

export default App;
