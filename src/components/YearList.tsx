import React from "react";
import { Stack } from "react-bootstrap";
import { Year } from "../interfaces/Year";
import { Course } from "../interfaces/Course";
import { YearView } from "./YearView";

export const YearList = ({
    years,
    deleteYear,
    editYear,
    modifiedCourses,
    coursePool,
    addToPool,
    removeFromPool
}: {
    years: Year[];
    deleteYear: (id: number) => void;
    editYear: (id: number, newYear: Year) => void;
    modifiedCourses: Record<string, Course>;
    coursePool: string[];
    addToPool: (course: Course) => boolean;
    removeFromPool: (course: Course) => void;
}) => {
    return (
        <div>
            <Stack gap={3}>
                {years.map((year: Year, yearIdx: number) => (
                    <div key={year.id + "yearId"} className="p-2 pb-0">
                        <YearView
                            year={year}
                            yearIdx={yearIdx}
                            deleteYear={deleteYear}
                            editYear={editYear}
                            modifiedCourses={modifiedCourses}
                            coursePool={coursePool}
                            addToPool={addToPool}
                            removeFromPool={removeFromPool}
                        ></YearView>
                        <hr></hr>
                    </div>
                ))}
            </Stack>
        </div>
    );
};
