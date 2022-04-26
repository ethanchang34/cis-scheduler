import React from "react";
import { Stack } from "react-bootstrap";
import { Year } from "../interfaces/Year";
import { Course } from "../interfaces/Course";
import { YearView } from "./YearView";

export const YearList = ({
    years,
    deleteYear,
    editYear,
    modifiedCourses
}: {
    years: Year[];
    deleteYear: (id: number) => void;
    editYear: (id: number, newYear: Year) => void;
    modifiedCourses: Record<string, Course>;
}) => {
    return (
        <div>
            <Stack gap={3}>
                {years.map((year: Year) => (
                    <div key={year.id} className="p-2 pb-0">
                        <YearView
                            year={year}
                            deleteYear={deleteYear}
                            editYear={editYear}
                            modifiedCourses={modifiedCourses}
                        ></YearView>
                        <hr></hr>
                    </div>
                ))}
            </Stack>
        </div>
    );
};
