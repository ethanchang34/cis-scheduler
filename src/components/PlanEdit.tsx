import React, { useState } from "react";
import { Plan } from "../interfaces/Plan";

export const PlanEdit = ({
    changeEditing,
    plan,
    editPlan,
    deletePlan
}: {
    changeEditing: () => void;
    plan: Plan;
    editPlan: (id: number, newPlan: Plan) => void;
    deletePlan: (id: number) => void;
}) => {
    const [newPlan, setNewPlan] = useState<Plan>({ ...plan });
};
