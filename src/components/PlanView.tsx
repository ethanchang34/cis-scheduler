import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Plan } from "../interfaces/Plan";
import { Year } from "../interfaces/Year";
import { Semester } from "../interfaces/Semester";
import { PlanEdit } from "./PlanEdit";
import { SemesterView } from "./SemesterView";

export const PlanView = ({
    plan,
    addPlan,
    deletePlan,
    editPlan
}: {
    plan: Plan;
    addPlan: () => void;
    deletePlan: (id: number) => void;
    editPlan: (id: number, newPlan: Plan) => void;
}) => {
    const [editing, setEditing] = useState<boolean>(false);

    function changeEditing() {
        setEditing(!editing);
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
            {plan.years.map((year: Year) => (
                <div
                    key={plan.years.indexOf(year)}
                    className="bg-light border m-2 p-2"
                >
                    {year.semesters.map((semester: Semester) => (
                        <div
                            key={year.semesters.indexOf(semester)}
                            className="bg-light border m-2 p-2"
                        >
                            <SemesterView semester={semester}></SemesterView>
                        </div>
                    ))}
                </div>
            ))}
            <Button className="float-right" size="sm" onClick={changeEditing}>
                Edit
            </Button>
        </div>
    );
};
