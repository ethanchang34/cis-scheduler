export interface Course {
    code: string; // Example: CISC 100
    subjectArea: string; // Example: CISC
    number: string; // Example: 100
    name: string;
    descr: string;
    tech: boolean;
    multicultural: boolean;
    breadth: string;
    preReq: string;
    restrict: string;
    semsOffered: number[];
    credits: number;
}
