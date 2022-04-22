import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Plan } from "../interfaces/Plan";
import { Year } from "../interfaces/Year";
import { Course } from "../interfaces/Course";
import { Semester } from "../interfaces/Semester";
import { PlanEdit } from "./PlanEdit";
import { YearList } from "./YearList";

export const PlanView = ({
    plan,
    deletePlan,
    editPlan,
    modifiedCourses,
    selected
}: {
    plan: Plan;
    deletePlan: (id: number) => void;
    editPlan: (id: number, newPlan: Plan) => void;
    modifiedCourses: Record<string, Course>;
    selected: boolean;
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
        editPlan(plan.id, {
            ...plan,
            years: [
                ...plan.years,
                {
                    id:
                        plan.years.length === 0
                            ? 0
                            : plan.years[plan.years.length - 1].id + 1,
                    semesters: [
                        { id: 0, active: true, courses: [] },
                        { id: 1, active: false, courses: [] },
                        { id: 2, active: true, courses: [] },
                        { id: 3, active: false, courses: [] }
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

    return editing ? (
        <PlanEdit
            changeEditing={changeEditing}
            plan={plan}
            editPlan={editPlan}
            deletePlan={deletePlan}
        ></PlanEdit>
    ) : (
        //<p>Id: {plan.id}</p>}
        <div>
            <h1>{plan.title}</h1>
            <i>Description: {plan.description}</i>
            {selected ? (
                <span>
                    <YearList
                        years={plan.years}
                        deleteYear={deleteYear}
                        editYear={editYear}
                        modifiedCourses={modifiedCourses}
                    ></YearList>
                    <Button className="btn-success m-1" onClick={addYear}>
                        + Add Year
                    </Button>
                    <Button
                        className="btn-danger m-1"
                        onClick={clearSemsInPlan}
                    >
                        Clear all semesters
                    </Button>
                </span>
            ) : (
                <div>
                    <Button
                        className="float-right mt-2"
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
