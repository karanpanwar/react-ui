declare interface AlertUser {
    name: string;
    type: string;
    dob: string;
    address: string;
}

declare interface AlertComment {
    comment: string;
    createdAt: string;
}

declare interface Alert {
    id: string;
    score: number;
    dueDate: string;
    alertResultId: 2;
    alertResult: string;
    alertName: string;
    userDetails: AlertUser;
    comments: AlertComment[];
}

declare type AlertData = {
    count: number;
    data: Alert[];
};
