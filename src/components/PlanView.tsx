import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Plan } from "../interfaces/Plan";
import { Year } from "../interfaces/Year";
import { Course } from "../interfaces/Course";
import { Semester } from "../interfaces/Semester";
import { PlanEdit } from "./PlanEdit";
import { YearList } from "./YearList";
import { Requirement } from "../interfaces/Requirement";
import { ReqCoursePlan } from "./ReqCoursePlan";

export const PlanView = ({
    plan,
    deletePlan,
    editPlan,
    modifiedCourses,
    selected,
    coursePool,
    addToPool,
    removeFromPool,
    reqs
}: {
    plan: Plan;
    deletePlan: (id: number) => void;
    editPlan: (id: number, newPlan: Plan) => void;
    modifiedCourses: Record<string, Course>;
    selected: boolean;
    coursePool: string[];
    addToPool: (course: Course) => boolean;
    removeFromPool: (course: Course) => void;
    reqs: Requirement;
}) => {
    const [editing, setEditing] = useState<boolean>(false);

    function changeEditing() {
        setEditing(!editing);
    }

    function deleteYear(id: number) {
        editPlan(plan.id, {
            ...plan,
            years: plan.years.filter((year: Year): boolean => year.id !== id)
        });
    }

    function addYear() {
        const yearIdPart =
            plan.years.length === 0
                ? plan.id * 40
                : Math.max(...plan.years.map((y: Year) => y.id)) + 4;
        editPlan(plan.id, {
            ...plan,
            years: [
                ...plan.years,
                {
                    id: yearIdPart,
                    semesters: [
                        { id: yearIdPart, active: true, courses: [] },
                        { id: yearIdPart + 1, active: false, courses: [] },
                        { id: yearIdPart + 2, active: true, courses: [] },
                        { id: yearIdPart + 3, active: false, courses: [] }
                    ]
                }
            ]
        });
    }

    function editYear(id: number, newYear: Year) {
        editPlan(plan.id, {
            ...plan,
            years: plan.years.map(
                (year: Year): Year => (year.id === id ? newYear : year)
            )
        });
    }

    function clearSemsInPlan() {
        editPlan(plan.id, {
            ...plan,
            years: plan.years.map(
                (year: Year): Year => ({
                    ...year,
                    semesters: year.semesters.map(
                        (semester: Semester): Semester => ({
                            ...semester,
                            active: false
                        })
                    )
                })
            )
        });
    }

    return (
        <div>
            {editing ? (
                <PlanEdit
                    changeEditing={changeEditing}
                    plan={plan}
                    editPlan={editPlan}
                    deletePlan={deletePlan}
                ></PlanEdit>
            ) : selected === true ? (
                <div>
                    <h1>{plan.title}</h1>
                    <i>Description: {plan.description}</i>
                    <ReqCoursePlan plan={plan} reqs={reqs}></ReqCoursePlan>
                    <span>
                        <YearList
                            years={plan.years}
                            deleteYear={deleteYear}
                            editYear={editYear}
                            modifiedCourses={modifiedCourses}
                            coursePool={coursePool}
                            addToPool={addToPool}
                            removeFromPool={removeFromPool}
                        ></YearList>
                        <Button
                            className="m-1 mx-auto d-block"
                            onClick={addYear}
                        >
                            + Add Year
                        </Button>
                        <Button
                            className="btn-danger m-1 mx-auto d-block"
                            onClick={clearSemsInPlan}
                        >
                            Clear all semesters
                        </Button>
                    </span>
                </div>
            ) : (
                <div>
                    <h1>{plan.title}</h1>
                    <i className="d-block">Description: {plan.description}</i>
                    <Button
                        className="btn-outline-primary btn-light mt-2"
                        size="sm"
                        onClick={changeEditing}
                    >
                        Edit
                    </Button>
                </div>
            )}
        </div>
    );
};
