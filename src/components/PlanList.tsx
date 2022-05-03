import React, { useEffect, useState } from "react";
import { Button, Form, Stack } from "react-bootstrap";
import "../App.css";
import { Plan } from "../interfaces/Plan";
import { Course } from "../interfaces/Course";
import { Year } from "../interfaces/Year";
import { PlanView } from "./PlanView";
import { SectionContent } from "../App";
import csvToJson from "csvtojson";
import { Semester } from "../interfaces/Semester";
import { downloadBlob } from "../App";

export const PlanList = ({
    plans,
    setPlans,
    modifiedCourses,
    coursePool,
    addToPool,
    removeFromPool
}: {
    plans: Plan[];
    setPlans: (newPlans: Plan[]) => void;
    coursePool: string[];
    modifiedCourses: Record<string, Course>;
    addToPool: (course: Course) => boolean;
    removeFromPool: (course: Course) => void;
}) => {
    const [selectedID, setSelectedID] = useState<number | null>(() => {
        const saved = localStorage.getItem("CISC275-4-selectedID");
        if (saved) {
            return JSON.parse(saved);
        } else {
            return null;
        }
    });

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

    const uploadPlans = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Might have removed the file, need to check that the files exist
        if (event.target.files && event.target.files.length) {
            // Get the first filename
            const filename = event.target.files[0];
            // Create a reader
            const reader = new FileReader();
            // Create lambda callback to handle when we read the file
            reader.onload = (loadEvent) => {
                // Target might be null, so provide default error value
                let newContent =
                    loadEvent.target?.result || "Data was not loaded";
                // FileReader provides string or ArrayBuffer, force it to be string
                newContent = newContent.toString();

                csvToJson()
                    .fromString(newContent)
                    .then((csvRow) => {
                        if (csvRow[0]["title"]) {
                            // This is a plans object
                            console.log(csvRow);
                            localStorage.removeItem("CISC275-4-selectedID");
                            setPlans(
                                csvRow.map((csvPlan, idNum): Plan => {
                                    const numYears = csvPlan["numYears"];
                                    let newYears: Year[] = [];
                                    for (let i = 0; i < numYears; i++) {
                                        const tempYear: Year = {
                                            id: idNum * 40 + i * 4,
                                            semesters: []
                                        };
                                        for (
                                            let j = i * 4;
                                            j < i * 4 + 4;
                                            j++
                                        ) {
                                            let tempCourses = [];
                                            if (csvPlan["semester_" + j]) {
                                                tempCourses =
                                                    csvPlan[
                                                        "semester_" + j
                                                    ].split(",");
                                            }
                                            csvPlan["semester_" + j].split(",");
                                            tempYear.semesters = [
                                                ...tempYear.semesters,
                                                {
                                                    id: idNum * 40 + j,
                                                    active:
                                                        csvPlan["semester_" + j]
                                                            .length !== 0,
                                                    courses: tempCourses
                                                }
                                            ];
                                        }
                                        newYears = [...newYears, tempYear];
                                    }
                                    return {
                                        id: idNum,
                                        title: csvPlan["title"],
                                        description: csvPlan["description"],
                                        years: newYears
                                    };
                                })
                            );
                        } else {
                            console.log("This is invalid data format");
                        }
                    });
            };
            // Actually read the file
            reader.readAsText(filename);
        }
    };

    const downloadPlans = () => {
        let csv = "";
        if (plans) {
            let header = ["title", "description", "numYears"];
            const yearNumArr = plans.map((p: Plan): number => p.years.length);
            const numYears = Math.max(...yearNumArr);
            for (let i = 0; i < numYears; i++) {
                const j = i * 4;
                header = [
                    ...header,
                    ("semester_" + j) as string,
                    ("semester_" + (j + 1)) as string,
                    ("semester_" + (j + 2)) as string,
                    ("semester_" + (j + 3)) as string
                ];
            }
            const planStrings: string = plans
                .map((p: Plan): string => {
                    const semestersString = p.years
                        .map((y: Year): string => {
                            return y.semesters
                                .map((s: Semester): string => {
                                    return (
                                        '"' +
                                        s.courses
                                            .toString()
                                            .replaceAll('"', '""') +
                                        '"'
                                    );
                                })
                                .join(",");
                        })
                        .join(",");
                    return (
                        '"' +
                        p.title.toString().replaceAll('"', '""') +
                        '"' +
                        "," +
                        '"' +
                        p.description.toString().replaceAll('"', '""') +
                        '"' +
                        "," +
                        '"' +
                        p.years.length.toString().replaceAll('"', '""') +
                        '"' +
                        "," +
                        semestersString
                    );
                })
                .join("\r\n");

            csv = [header, planStrings].join("\r\n");
            downloadBlob(csv, "PlansExport.csv", "text/csv;charset=utf-8;");
        }
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
                                    // className="bg-light border m-2 p-2"
                                    className="border m-2 p-3 text-white"
                                    style={{
                                        backgroundColor: "var(--primary-color)",
                                        borderRadius: 8
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
                                    ></PlanView>
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "center"
                                        }}
                                    >
                                        <span
                                            style={{
                                                fontSize: "12px",
                                                fontStyle: "italic",
                                                cursor: "pointer"
                                            }}
                                            onClick={() =>
                                                changeSelectedID(plan.id)
                                            }
                                        >
                                            Click to expand
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </Stack>
                        <Button className="m-2" onClick={addPlan}>
                            Add Plan
                        </Button>
                        <Button
                            onClick={() => {
                                downloadPlans();
                            }}
                        >
                            Download Plans
                        </Button>
                        <Form.Group controlId="exampleForm">
                            <Form.Label>Upload a plans file</Form.Label>
                            <Form.Control type="file" onChange={uploadPlans} />
                        </Form.Group>
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
