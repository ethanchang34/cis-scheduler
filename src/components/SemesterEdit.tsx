import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Semester } from "../interfaces/Semester";

export const SemesterEdit = ({
    changeEditing,
    semester,
    editSemester,
    deleteSemester
}: {
    changeEditing: () => void;
    semester: Semester;
    editSemester: (id: number, newSemester: Semester) => void; //NEED to add id param to Semester interface
    deleteSemester: (id: number) => void;
}) => {
    const [newSemester, setNewSemester] = useState<Semester>({ ...semester });

    //Save functionality may not be necessary depending if we add any front-end params to Semester interface
    function save() {
        editSemester(semester.id, { ...newSemester });
        changeEditing();
    }

    function cancel() {
        changeEditing();
    }

    return (
        <div>
            <Button onClick={save} variant="success" className="me-4">
                Save
            </Button>
            <Button onClick={cancel} variant="warning" className="me-5">
                Cancel
            </Button>
            <Button
                onClick={() => deleteSemester(semester.id)}
                variant="danger"
                className="me-8"
            >
                Delete
            </Button>
        </div>
    );
};
