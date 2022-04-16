import { Course } from "./Course";

export interface Semester {
    id: number;
    active: boolean;
    courses: Course[];
}
