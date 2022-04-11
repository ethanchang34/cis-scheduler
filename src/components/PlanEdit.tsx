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
                    ></Form.Control>
                </Form.Group>
                <Button onClick={save} variant="success" className="me-4">
                    Save
                </Button>
                <Button onClick={cancel} variant="warning" className="me-5">
                    Cancel
                </Button>
                <Button
                    onClick={() => deletePlan(plan.id)}
                    variant="danger"
                    className="me-8"
                >
                    Delete
                </Button>
            </div>
        </div>
    );
};
