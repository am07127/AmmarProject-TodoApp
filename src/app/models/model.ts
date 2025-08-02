export enum Priority {
    LOW = "LOW",
    MEDIUM = "MEDIUM",
    HIGH = "HIGH"
}


export interface ITodo {
    _id: string;
    title: string;
    description: string;
    priority: Priority;
    date?: Date;
}
