import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
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

    function save() {
        editPlan(plan.id, { ...newPlan });
        changeEditing();
    }

    function cancel() {
        changeEditing();
    }

    return (
        <div>
            <div>
                <Form.Group controlId="formEditPlan">
                    <Form.Label>Plan Title: </Form.Label>
                    <Form.Control
                        value={newPlan.title}
                        onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                        ) =>
                            setNewPlan({
                                ...newPlan,
                                title: event.target.value
                            })
                        }
                        onKeyPress={(e) => {
                            if (e.key === "Enter") {
                                save();
                            }
                        }}
                    ></Form.Control>
                    <Form.Label>Plan Description: </Form.Label>
                    <Form.Control
                        value={newPlan.description}
                        onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                        ) => {
                            setNewPlan({
                                ...newPlan,
                                description: event.target.value
                            });
                        }}
                        onKeyPress={(e) => {
                            if (e.key === "Enter") {
                                save();
                            }
                        }}
                    ></Form.Control>
                </Form.Group>
                <Button
                    onClick={save}
                    variant="success"
                    className="btn-outline-primary btn-light"
                >
                    Save
                </Button>
                <Button
                    onClick={cancel}
                    variant="warning"
                    className="btn-outline-secondary btn-light m-2"
                >
                    Cancel
                </Button>
                <Button
                    onClick={() => deletePlan(plan.id)}
                    variant="danger"
                    className="btn-outline-danger btn-light"
                >
                    Delete
                </Button>
            </div>
        </div>
    );
};
