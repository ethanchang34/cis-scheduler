import React from "react";
import { Button, Stack } from "react-bootstrap";
import { Year } from "../interfaces/Year";
import { YearView } from "./YearView";

export const YearList = ({
    years,
    deleteYear,
    editYear
}: {
    years: Year[];
    deleteYear: (id: number) => void;
    editYear: (id: number, newYear: Year) => void;
}) => {
    return (
        <div>
            <Stack gap={3}>
                {years.map((year: Year) => (
                    <div key={year.id} className="bg-light border m-2 p-2">
                        <YearView
                            year={year}
                            deleteYear={deleteYear}
                            editYear={editYear}
                        ></YearView>
                    </div>
                ))}
            </Stack>
        </div>
    );
};
