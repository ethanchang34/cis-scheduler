import React, { useEffect, useState } from "react";
import { Button, Form, Stack } from "react-bootstrap";
import { Plan } from "../../interfaces/Plan";
import { Course } from "../../interfaces/Course";
import { PlanView } from "./PlanView";
import { SectionContent } from "../../App";
import styled from "styled-components";
import { Requirement } from "../../interfaces/Requirement";
import { DefaultPlans } from "../../data/TestData";
import { ReqCoursePlanner } from "./ReqCoursePlanner";
import { uploadPlans, downloadPlans } from "../../data/ParseDataFunctions";
import { ChevronDownIcon } from "@heroicons/react/solid";

export const Expand = styled.span`
    &:hover {
        filter: brightness(300%);
        transition: 250ms;
    }
`;

export const PlanList = ({
    modifiedCourses,
    coursePool,
    addToPool,
    removeFromPool,
    reqs,
    updateUserMetadataPlans
}: {
    coursePool: string[];
    modifiedCourses: Record<string, Course>;
    addToPool: (course: Course) => boolean;
    removeFromPool: (course: Course) => void;
    reqs: Requirement;
    updateUserMetadataPlans: (plans: Plan[]) => void;
}) => {
    const [selectedID, setSelectedID] = useState<number | null>(() => {
        const saved = localStorage.getItem("CISC275-4-selectedID");
        if (saved) {
            return JSON.parse(saved);
        } else {
            return null;
        }
    });

    const [plans, setPlans] = useState<Plan[]>(() => {
        const saved = localStorage.getItem("CISC275-4-plans");
        if (saved) {
            return JSON.parse(saved);
        } else {
            return DefaultPlans;
        }
    });

    useEffect(() => {
        localStorage.setItem("CISC275-4-plans", JSON.stringify(plans));
        updateUserMetadataPlans(plans);
    }, [plans]);

    useEffect(() => {
        localStorage.setItem(
            "CISC275-4-selectedID",
            JSON.stringify(selectedID)
        );
    }, [selectedID]);

    const changeSelectedID = (id: number) => {
        if (selectedID === null) {
            setSelectedID(id);
        } else {
            setSelectedID(null);
        }
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

    return (
        <section>
            <SectionContent>
                {selectedID === null && (
                    <div>
                        <Stack gap={3}>
                            {plans.map((plan: Plan) => (
                                <div
                                    key={plan.id}
                                    className="text-white"
                                    style={{
                                        backgroundColor: "var(--primary-color)",
                                        borderRadius: 8,
                                        padding: "1rem",
                                        paddingBottom: "0"
                                    }}
                                >
                                    <PlanView
                                        plan={plan}
                                        deletePlan={deletePlan}
                                        editPlan={editPlan}
                                        modifiedCourses={modifiedCourses}
                                        selected={false}
                                        coursePool={coursePool}
                                        addToPool={addToPool}
                                        removeFromPool={removeFromPool}
                                        reqs={reqs}
                                    ></PlanView>
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "center"
                                        }}
                                    >
                                        <Expand
                                            data-testid="chevron"
                                            onClick={() =>
                                                changeSelectedID(plan.id)
                                            }
                                        >
                                            <ChevronDownIcon
                                                style={{
                                                    display: "block",
                                                    marginLeft: "auto",
                                                    marginRight: "auto",
                                                    width: "2rem",
                                                    cursor: "pointer"
                                                }}
                                            ></ChevronDownIcon>
                                        </Expand>
                                    </div>
                                </div>
                            ))}
                        </Stack>
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
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                    uploadPlans(plans, setPlans, e);
                                }}
                            />
                        </Form.Group>
                        <ReqCoursePlanner reqs={reqs}></ReqCoursePlanner>
                    </div>
                )}
                <Stack gap={3}>
                    {plans.map((plan: Plan) => (
                        <div key={plan.id}>
                            {plan.id === selectedID && (
                                <div className="m-2 p-2">
                                    <span
                                        style={{
                                            fontSize: "40px",
                                            cursor: "pointer"
                                        }}
                                        onClick={() =>
                                            changeSelectedID(plan.id)
                                        }
                                    >
                                        🠔
                                    </span>
                                    <PlanView
                                        plan={plan}
                                        deletePlan={deletePlan}
                                        editPlan={editPlan}
                                        modifiedCourses={modifiedCourses}
                                        selected={true}
                                        coursePool={coursePool}
                                        addToPool={addToPool}
                                        removeFromPool={removeFromPool}
                                        reqs={reqs}
                                    ></PlanView>
                                </div>
                            )}
                        </div>
                    ))}
                </Stack>
            </SectionContent>
        </section>
    );
};
