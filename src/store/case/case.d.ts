declare interface UserDetails {
    name: string;
    address: string;
    email: string;
    dob: string;
    country: string;
}

declare interface Case {
    assignee: string;
    caseId: string;
    caseName: string;
    completed: false;
    dueDate: string;
    ended: boolean;
    hasTasks: boolean;
    isAssignable: boolean;
    priority: string;
    score: number;
    startTime: string;
    state: string;
    taskId: string;
    totalAlerts: number;
    userDetails: UserDetails;
}

declare type CaseData = Case[];
