import { Year } from "./Year";

export interface Plan {
    id: number;
    title: string;
    description: string;
    years: Year[];
}
