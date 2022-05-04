import { Course } from "./Course";

export interface UserData {
    "CISC275-4-plans": string;
    "CISC275-4-modifiedCourses": Record<string, Course>;
}
