import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Year } from "../interfaces/Year";
import { Semester } from "../interfaces/Semester";
import { SemesterList } from "./SemesterList";

export const YearView = ({
    year,
    deleteYear,
    editYear
}: {
    year: Year;
    deleteYear: (id: number) => void;
    editYear: (id: number, newYear: Year) => void;
}) => {
    const semesterToNumber: Record<string, number> = {
        fall: 0,
        winter: 1,
        spring: 2,
        summer: 3
    };

    function addSemester(event: React.ChangeEvent<HTMLSelectElement>) {
        editYear(year.id, {
            ...year,
            semesters: year.semesters.map(
                (semester: Semester): Semester =>
                    semesterToNumber[event.target.value] === semester.id
                        ? { ...semester, active: true }
                        : semester
            )
        });
    }

    function deleteSemester(id: number) {
        editYear(year.id, {
            ...year,
            semesters: year.semesters.map(
                (semester: Semester): Semester =>
                    id === semester.id
                        ? { ...semester, active: false }
                        : semester
            )
        });
    }

    function editSemester(id: number, newSemester: Semester) {
        editYear(year.id, {
            ...year,
            semesters: year.semesters.map(
                (semester: Semester): Semester =>
                    semester.id === id ? newSemester : semester
            )
        });
    }

    return (
        <div>
            <p>Year ID: {year.id}</p>
            <SemesterList
                semesters={year.semesters}
                addSemester={addSemester}
                deleteSemester={deleteSemester}
                editSemester={editSemester}
            ></SemesterList>
            <Form.Group controlId="addSemester">
                <Form.Label>Add Semester</Form.Label>
                <Form.Select onChange={addSemester}>
                    <option value="fall">Fall</option>
                    <option value="winter">Winter</option>
                    <option value="spring">Spring</option>
                    <option value="summer">Summer</option>
                </Form.Select>
            </Form.Group>
            <Button onClick={() => deleteYear(year.id)}>- Delete Year</Button>
        </div>
    );
};
