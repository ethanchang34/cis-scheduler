import React, { useState } from "react";
import "./App.css";
import { LandingPage } from "./LandingPage";
import { CourseSearch } from "./CourseSearch";
import { Course } from "./interfaces/Course";
import { Plan } from "./interfaces/Plan";
import { Button } from "react-bootstrap";
import { PlansView } from "./PlansView";

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

    return (
        <div className="App">
            <Button
                onClick={() => {
                    setSearch(!search);
                }}
            >
                {search ? "Back" : "Search Courses"}
            </Button>
            <div style={{ display: !search ? "block" : "none" }}>
                <div style={{ display: landing ? "block" : "none" }}>
                    <LandingPage flipLanding={flipLanding}></LandingPage>
                </div>
                <div style={{ display: !landing ? "block" : "none" }}>
                    <PlansView flipLanding={flipLanding}></PlansView>
                </div>
            </div>
            <div style={{ display: search ? "block" : "none" }}>
                <CourseSearch></CourseSearch>
            </div>
        </div>
    );
}

export default App;
