import React from "react";
import { Form } from "react-bootstrap";
import { Requirement } from "../../interfaces/Requirement";

export const ReqCoursePlanner = ({
    concentration,
    updateConcentration,
    reqs
}: {
    concentration: string;
    updateConcentration: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    reqs: Requirement;
}) => {
    const concentrations: string[] = [
        "Undecided/Custom",
        "Artificial Intelligence and Robotics",
        "Bioinformatics",
        "Cybersecurity",
        "Data Science",
        "High Performance Computing",
        "Systems and Networks",
        "Theory and Computation"
    ];

    return (
        <>
            <Form.Group className="mt-2 mb-4" controlId="changeConcentration">
                <Form.Label style={{ fontSize: "32px", fontStyle: "bold" }}>
                    Set Concentration
                </Form.Label>
                <Form.Select
                    value={concentration}
                    onChange={updateConcentration}
                >
                    {concentrations.map((conc: string) => (
                        <option key={conc} value={conc}>
                            {conc}
                        </option>
                    ))}
                </Form.Select>
            </Form.Group>
            <div>
                <div style={{ textAlign: "center" }}>
                    <h3>Requirements</h3>
                </div>
                <h4>Courses:</h4>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        textAlign: "left"
                    }}
                >
                    {reqs.courses.join(", ")}
                </div>
                <br></br>
                <h4>Breadth credits:</h4>
                <div
                    style={{
                        // display: "flex",
                        // flexDirection: "row",
                        textAlign: "left"
                    }}
                >
                    <div>Technical Elective Credits: {reqs.tech}</div>
                    <div>Multicultural Credits: {reqs.multicultural}</div>
                    <div>
                        Creative Arts and Humanities Credits: {reqs.creative}
                    </div>
                    <div>
                        History and Cultural Change Credits: {reqs.history}
                    </div>
                    <div>
                        Social and Behavioral Sciences Credits: {reqs.social}
                    </div>
                    <div>
                        Mathematics, Natural Sciences and Technology Credits:{" "}
                        {reqs.math}
                    </div>
                </div>
            </div>
        </>
    );
};
