import React from "react";
import { Form } from "react-bootstrap";
import { Course } from "../../../interfaces/Course";

export const EditBreadth = ({
    newCourse,
    setNewCourse
}: {
    newCourse: Course;
    setNewCourse: (newCourse: Course) => void;
}) => {
    const updateBreadth = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value === newCourse.breadth) {
            setNewCourse({ ...newCourse, breadth: "" });
        } else {
            setNewCourse({ ...newCourse, breadth: e.target.value });
        }
        console.log(newCourse.breadth);
    };

    return (
        <>
            <Form.Label>Set Breadth: </Form.Label>
            <div>
                <Form.Check
                    type="checkbox"
                    id="edit-breadth-creative"
                    label="Creative Arts and Humanities"
                    name="edit-breadth-creative"
                    value="Creative Arts and Humanities"
                    checked={
                        newCourse.breadth === "Creative Arts and Humanities"
                    }
                    onChange={updateBreadth}
                />
                <Form.Check
                    type="checkbox"
                    id="edit-breadth-history"
                    label="History and Cultural Change"
                    name="edit-breadth-history"
                    value="History and Cultural Change"
                    checked={
                        newCourse.breadth === "History and Cultural Change"
                    }
                    onChange={updateBreadth}
                />
                <Form.Check
                    type="checkbox"
                    id="edit-breadth-social"
                    label="Social and Behavioral Sciences"
                    name="edit-breadth-social"
                    value="Social and Behavioral Sciences"
                    checked={
                        newCourse.breadth === "Social and Behavioral Sciences"
                    }
                    onChange={updateBreadth}
                />
                <Form.Check
                    type="checkbox"
                    id="edit-breadth-math"
                    label="Mathematics, Natural Sciences and Technology"
                    name="edit-breadth-math"
                    value="Mathematics, Natural Sciences and Technology"
                    checked={
                        newCourse.breadth ===
                        "Mathematics, Natural Sciences and Technology"
                    }
                    onChange={updateBreadth}
                />
            </div>
        </>
    );
};
