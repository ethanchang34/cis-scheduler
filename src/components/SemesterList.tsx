import React from "react";
import { Button, Stack } from "react-bootstrap";
import { Semester } from "../interfaces/Semester";
import { SemesterView } from "./SemesterView";

export const SemesterList = ({
    semesters,
    addSemester,
    deleteSemester,
    editSemester
}: {
    semesters: Semester[];
    addSemester: (event: React.ChangeEvent<HTMLSelectElement>) => void; //we aren't actually 'adding', we're switching the Semester's 'active'(boolean) param to false or true
    deleteSemester: (id: number) => void;
    editSemester: (id: number, newSemester: Semester) => void;
}) => {
    return (
        <div>
            <Stack gap={3}>
                {semesters.map((semester: Semester) =>
                    semester.active === true ? (
                        <div
                            key={semester.id}
                            className="bg-light border m-2 p-2"
                        >
                            <SemesterView
                                semester={semester}
                                addSemester={addSemester}
                                deleteSemester={deleteSemester}
                                editSemester={editSemester}
                            ></SemesterView>
                        </div>
                    ) : (
                        <></>
                    )
                )}
            </Stack>
        </div>
    );
};
