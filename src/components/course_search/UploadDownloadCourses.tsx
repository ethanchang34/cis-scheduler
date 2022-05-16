import React from "react";
import { downloadCourses, uploadCourse } from "../../data/ParseDataFunctions";
import { Button, Form } from "react-bootstrap";
import { Course } from "../../interfaces/Course";

export const UploadDownloadCourses = ({
    modifiedCourses,
    setModifiedCourses,
    resetCourses
}: {
    modifiedCourses: Record<string, Course>;
    setModifiedCourses: (courses: Record<string, Course>) => void;
    resetCourses: () => void;
}) => {
    return (
        <>
            <Button
                onClick={() => {
                    downloadCourses();
                }}
                style={{ marginRight: "1rem" }}
            >
                Download Courses
            </Button>
            <Button
                className="btn-danger"
                onClick={() => {
                    resetCourses();
                }}
            >
                Reset Course Changes
            </Button>
            <Form.Group controlId="exampleForm">
                <Form.Label>Upload a course file</Form.Label>
                <Form.Control
                    type="file"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        uploadCourse(modifiedCourses, setModifiedCourses, e);
                    }}
                />
            </Form.Group>
        </>
    );
};
