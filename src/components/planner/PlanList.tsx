import React, { useEffect, useState } from "react";
import { Stack } from "react-bootstrap";
import { Plan } from "../../interfaces/Plan";
import { Course } from "../../interfaces/Course";
import { PlanView } from "./PlanView";
import { SectionContent } from "../../App";
import styled from "styled-components";
import { Requirement } from "../../interfaces/Requirement";
import {
    AIandRoboticsRequirement,
    BioinformaticsRequirement,
    CybersecurityRequirement,
    DataScienceRequirement,
    DefaultPlans,
    DefaultRequirement,
    HPComputingRequirement,
    SystemsNetworksRequirement,
    TheoryComputationRequirement
} from "../../data/TestData";
import { ReqCoursePlanner } from "./ReqCoursePlanner";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { UploadDownloadPlans } from "./UploadDownloadPlans";

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
    updateUserMetadataPlans,
    setReqs
}: {
    coursePool: string[];
    modifiedCourses: Record<string, Course>;
    addToPool: (course: Course) => boolean;
    removeFromPool: (course: Course) => void;
    reqs: Requirement;
    updateUserMetadataPlans: (plans: Plan[]) => void;
    setReqs: (newReqs: Requirement) => void;
}) => {
    const [concentration, setConcentration] =
        useState<string>("Undecided/Custom");

    const updateConcentration = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setConcentration(event.target.value);
        if (event.target.value === "Undecided/Custom") {
            setReqs(DefaultRequirement);
        } else if (
            event.target.value === "Artificial Intelligence and Robotics"
        ) {
            setReqs(AIandRoboticsRequirement);
        } else if (event.target.value === "Bioinformatics") {
            setReqs(BioinformaticsRequirement);
        } else if (event.target.value === "Cybersecurity") {
            setReqs(CybersecurityRequirement);
        } else if (event.target.value === "Data Science") {
            setReqs(DataScienceRequirement);
        } else if (event.target.value === "High Performance Computing") {
            setReqs(HPComputingRequirement);
        } else if (event.target.value === "Systems and Networks") {
            setReqs(SystemsNetworksRequirement);
        } else if (event.target.value === "Theory and Computation") {
            setReqs(TheoryComputationRequirement);
        }
    };

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
                        <UploadDownloadPlans
                            plans={plans}
                            setPlans={setPlans}
                        ></UploadDownloadPlans>
                        <ReqCoursePlanner
                            concentration={concentration}
                            updateConcentration={updateConcentration}
                            reqs={reqs}
                        ></ReqCoursePlanner>
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
                                        ????
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
