import React from "react";
import { Stack } from "react-bootstrap";
import { Semester } from "../interfaces/Semester";
import { SemesterView } from "./SemesterView";

export const SemesterList = ({
    semesters,
    deleteSemester,
    editSemester
}: {
    semesters: Semester[];
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
