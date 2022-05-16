import React from "react";
import { Form } from "react-bootstrap";
import { Course } from "../../../interfaces/Course";

export const EditSemesters = ({
    newCourse,
    setNewCourse
}: {
    newCourse: Course;
    setNewCourse: (newCourse: Course) => void;
}) => {
    const updateSemester = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newSems: number = parseInt(e.target.value);

        if (newCourse.semsOffered.includes(newSems)) {
            setNewCourse({
                ...newCourse,
                semsOffered: newCourse.semsOffered.filter((e) => e !== newSems)
            });
        } else {
            setNewCourse({
                ...newCourse,
                semsOffered: [...newCourse.semsOffered, newSems]
            });
        }
    };
    return (
        <>
            {" "}
            <Form.Label>
                <b>Set Semesters: </b>
            </Form.Label>
            <div>
                <Form.Check
                    inline
                    type="checkbox"
                    name="edit-sems"
                    onChange={updateSemester}
                    id="edit-sems-fall"
                    label="Fall"
                    value="0"
                    checked={newCourse.semsOffered.includes(0)}
                />
                <Form.Check
                    inline
                    type="checkbox"
                    name="edit-sems"
                    onChange={updateSemester}
                    id="edit-sems-winter"
                    label="Winter"
                    value="1"
                    checked={newCourse.semsOffered.includes(1)}
                />
                <Form.Check
                    inline
                    type="checkbox"
                    name="edit-sems"
                    onChange={updateSemester}
                    id="edit-sems-spring"
                    label="Spring"
                    value="2"
                    checked={newCourse.semsOffered.includes(2)}
                />
                <Form.Check
                    inline
                    type="checkbox"
                    name="edit-sems"
                    onChange={updateSemester}
                    id="edit-sems-summer"
                    label="Summer"
                    value="3"
                    checked={newCourse.semsOffered.includes(3)}
                />
            </div>
        </>
    );
};
