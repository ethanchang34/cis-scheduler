import React, { useState } from "react";
import "./App.css";
import { LandingPage } from "./components/LandingPage";
import { CourseSearch } from "./components/CourseSearch";
import { NavBar } from "./components/NavBar";
import { Plan } from "./interfaces/Plan";
import { Course } from "./interfaces/Course";
import { Planner } from "./components/Planner";
import { DefaultPlans, Catalog } from "./data/TestData";
import { ViewCourseModal } from "./components/ViewCourseModal";

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

const originalCourses: Record<string, Course> = {};

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

                // Below comment is logic for extracting mentioned courses in prereqs

                // let coursePreReq: string[] = [];
                // const parsePreReq = activeCourse.preReq;

                // let consecutiveNums = 0;

                // for (let i = 0; i < parsePreReq.length; i++) {
                //     if (!isNaN(parseInt(parsePreReq[i]))) {
                //         consecutiveNums++;
                //         if (consecutiveNums === 3) {
                //             coursePreReq = [
                //                 ...coursePreReq,
                //                 parsePreReq.substring(i - 7, i + 1)
                //             ];
                //             consecutiveNums = 0;
                //         }
                //     }
                // }

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

// Below I measure performance of selecting from the courses, takes around 10 milliseconds

// const startTime = performance.now();
// console.log(
//     Object.values(originalCourses).filter(
//         (course: Course) => course.subjectArea == "CISC"
//     )
// );
// const endTime = performance.now();
// console.log(`Call to doSomething took ${endTime - startTime} milliseconds`);

function App(): JSX.Element {
    const [modifiedCourses, setModifiedCourses] =
        useState<Record<string, Course>>(originalCourses);
    const [plans, setPlans] = useState<Plan[]>(DefaultPlans);
    const [search, setSearch] = useState<boolean>(false);
    const [landing, setLanding] = useState<boolean>(true);
    //const [pageName, setPageName] = useState<string>("Plans"); // set this value to whatever the navbar needs to display.

    const [showCourseModal, setShowCourseModal] = useState(false);
    const [codeModalView, setCodeModalView] = useState<string>("CISC 437");

    const handleShowModal = (code: string) => {
        setShowCourseModal(true);
        setCodeModalView(code);
    };
    const handleCloseModal = () => setShowCourseModal(false);

    const editCourse = (newCourse: Course) => {
        const newModifiedCourses = { ...modifiedCourses };
        newModifiedCourses[newCourse.code] = newCourse;
        setModifiedCourses(newModifiedCourses);
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

    const flipLanding = () => {
        setLanding(!landing);
        // setSearch(false);
    };

    const flipSearch = () => {
        setSearch(!search);
        // setLanding(false);
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
                    {/*I only set this component to display none because I it to remain the same after switching to and from course search. */}
                    <Planner
                        plans={plans}
                        addPlan={addPlan}
                        editPlan={editPlan}
                        deletePlan={deletePlan}
                        modifiedCourses={modifiedCourses}
                    ></Planner>
                </div>
            </div>
            <div style={{ display: search ? "block" : "none" }}>
                <CourseSearch
                    modifiedCourses={modifiedCourses}
                    handleShowModal={handleShowModal}
                ></CourseSearch>
            </div>
            <ViewCourseModal
                show={showCourseModal}
                handleClose={handleCloseModal}
                code={codeModalView}
                editCourse={editCourse}
                modifiedCourses={modifiedCourses}
            ></ViewCourseModal>
        </div>
    );
}

export default App;
