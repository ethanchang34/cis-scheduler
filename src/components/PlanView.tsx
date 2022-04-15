import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Plan } from "../interfaces/Plan";
import { Year } from "../interfaces/Year";
import { PlanEdit } from "./PlanEdit";
import { YearList } from "./YearList";

export const PlanView = ({
    plan,
    deletePlan,
    editPlan
}: {
    plan: Plan;
    deletePlan: (id: number) => void;
    editPlan: (id: number, newPlan: Plan) => void;
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

    return editing ? (
        <PlanEdit
            changeEditing={changeEditing}
            plan={plan}
            editPlan={editPlan}
            deletePlan={deletePlan}
        ></PlanEdit>
    ) : (
        <div>
            <p>Id: {plan.id}</p>
            <p>Title: {plan.title}</p>
            <p>Description: {plan.description}</p>
            <YearList
                years={plan.years}
                deleteYear={deleteYear}
                editYear={editYear}
            ></YearList>
            <Button onClick={addYear}>+ Add Year</Button>
            <Button className="float-right" size="sm" onClick={changeEditing}>
                Edit
            </Button>
        </div>
    );
};
