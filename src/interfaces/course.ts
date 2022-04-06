export interface Course {
    department: string;
    id: number;
    tech: boolean;
    breadth: boolean;
    preReq: Course[];
    credits: number;
}
