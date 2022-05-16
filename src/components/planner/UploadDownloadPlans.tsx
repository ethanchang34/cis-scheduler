import React from "react";
import { Button, Form } from "react-bootstrap";
import { Plan } from "../../interfaces/Plan";
import { uploadPlans, downloadPlans } from "../../data/ParseDataFunctions";

export const UploadDownloadPlans = ({
    plans,
    setPlans
}: {
    plans: Plan[];
    setPlans: React.Dispatch<React.SetStateAction<Plan[]>>;
}) => {
    const addPlan = () => {
        const newPlan: Plan = {
            id: plans.length === 0 ? 0 : plans[plans.length - 1].id + 1,
            title: "New Plan",
            description: "Add description",
            years: []
        };
        setPlans([...plans, newPlan]);
    };

    return (
        <>
            <Button
                style={{ marginTop: ".5rem", marginRight: "1rem" }}
                onClick={addPlan}
            >
                Add Plan
            </Button>
            <Button
                style={{ marginTop: ".5rem" }}
                onClick={() => {
                    downloadPlans(plans);
                }}
            >
                Download Plans
            </Button>
            <Form.Group
                style={{ marginBottom: "1rem" }}
                controlId="exampleForm"
            >
                <Form.Label>Upload a plans file</Form.Label>
                <Form.Control
                    type="file"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        uploadPlans(setPlans, e);
                    }}
                />
            </Form.Group>
        </>
    );
};
