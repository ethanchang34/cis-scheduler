import React from "react";
import { Button /*, Form*/ } from "react-bootstrap";
import { Year } from "../interfaces/Year";
import { Semester } from "../interfaces/Semester";
import { Course } from "../interfaces/Course";
import { SemesterList } from "./SemesterList";

export const YearView = ({
    year,
    deleteYear,
    editYear,
    modifiedCourses
}: {
    year: Year;
    deleteYear: (id: number) => void;
    editYear: (id: number, newYear: Year) => void;
    modifiedCourses: Record<string, Course>;
}) => {
    /*const semesterToNumber: Record<string, number> = {
        fall: 0,
        winter: 1,
        spring: 2,
        summer: 3
    };*/

    function addSemester(id: number) {
        editYear(year.id, {
            ...year,
            semesters: year.semesters.map(
                (semester: Semester): Semester =>
                    id === semester.id
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

    function clearSemesters() {
        editYear(year.id, {
            ...year,
            semesters: year.semesters.map(
                (semester: Semester): Semester => ({
                    ...semester,
                    active: false
                })
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
                modifiedCourses={modifiedCourses}
            ></SemesterList>
            {/*
            <Form.Group controlId="addSemester">
                <Form.Label>Add Semester</Form.Label>
                <Form.Select onChange={addSemester}>
                    <option value="fall">Fall</option>
                    <option value="winter">Winter</option>
                    <option value="spring">Spring</option>
                    <option value="summer">Summer</option>
                </Form.Select>
            </Form.Group>
            */}
            <Button onClick={clearSemesters}>Clear Semesters</Button>
            <Button onClick={() => deleteYear(year.id)}>- Delete Year</Button>
        </div>
    );
};
